import { useState, useRef, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

import * as S from './style';

import ChatVideo from 'components/videos/chatvideo';
import VideoCarousel from 'components/carousel/videocarousel';

const pc_config = {
	iceServers: [
		{
			urls: 'stun:stun.l.google.com:19302',
		},
	],
};

export default function Videos({ props: { propagate, room, nowUser, videoOn, headsetOn, translateOn } }) {
	const socketRef = useRef();
	const pcsRef = useRef({});
	const localVideoRef = useRef(null);
	const localStreamRef = useRef();
	const [users, setUsers] = useState([]);
	const [translated, setTranslated] = useState({});

	const getLocalStream = useCallback(async () => {
		try {
			const localStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: {
					width: 240,
					height: 240,
				},
			});

			localStreamRef.current = localStream;

			if (localVideoRef.current) {
				localVideoRef.current.srcObject = localStream;
			}

			if (!socketRef.current) {
				return;
			}

			if (localStreamRef.current) {
				const VideoTrack = localStreamRef.current.getTracks().find(track => track.kind === 'video');
				if (VideoTrack instanceof Object) VideoTrack.enabled = false;
				const AudioTrack = localStreamRef.current.getTracks().find(track => track.kind === 'audio');
				if (AudioTrack instanceof Object) AudioTrack.enabled = false;
			}

			socketRef.current.emit('join_room', {
				room: room,
				email: nowUser.memberMail,
			});
		} catch (e) {
			console.log(`getUserMedia error: ${e}`);
		}
	}, [room, nowUser]);

	const createPeerConnection = useCallback((socketID, email) => {
		try {
			const pc = new RTCPeerConnection(pc_config);

			pc.onicecandidate = (e) => {
				if (!(socketRef.current && e.candidate)) {
					return;
				}

				console.log('onicecandidate');

				socketRef.current.emit('candidate', {
					candidate: e.candidate,
					candidateSendID: socketRef.current.id,
					candidateReceiveID: socketID,
				});
			};

			pc.oniceconnectionstatechange = (e) => {
				console.log(e);
			};

			pc.ontrack = (e) => {
				console.log('ontrack success');

				setUsers((oldUsers) =>
					oldUsers
						.filter((user) => user.id !== socketID)
						.concat({
							id: socketID,
							email,
							stream: e.streams[0],
						}),
				);
			};

			if (localStreamRef.current) {
				console.log('localstream add');

				localStreamRef.current.getTracks().forEach((track) => {
					if (!localStreamRef.current) {
						return;

					}
					pc.addTrack(track, localStreamRef.current);
				});
			} else {
				console.log('no local stream');
			}

			return pc;
		} catch (e) {
			console.error(e);

			return undefined;
		}
	}, []);

	useEffect(() => {
		setUsers([]);
	}, [room])

	useEffect(() => {
		socketRef.current = io.connect(process.env.REACT_APP_VIDEO_SERVER);

		getLocalStream();

		socketRef.current.on('all_users', (allUsers) => {
			allUsers.forEach(async (user) => {
				if (!localStreamRef.current) {
					return;
				}

				const pc = createPeerConnection(user.id, user.email);

				if (!(pc && socketRef.current)) {
					return;
				}

				pcsRef.current = { ...pcsRef.current, [user.id]: pc };

				try {
					const localSdp = await pc.createOffer({
						offerToReceiveAudio: true,
						offerToReceiveVideo: true,
					});

					console.log('create offer success');

					await pc.setLocalDescription(new RTCSessionDescription(localSdp));

					socketRef.current.emit('offer', {
						sdp: localSdp,
						offerSendID: socketRef.current.id,
						offerSendEmail: nowUser.memberMail,
						offerReceiveID: user.id,
					});
				} catch (e) {
					console.error(e);
				}
			});
		});

		socketRef.current.on(
			'getOffer',
			async (data) => {
				const { sdp, offerSendID, offerSendEmail } = data;

				console.log('get offer');

				if (!localStreamRef.current) {
					return;
				}

				const pc = createPeerConnection(offerSendID, offerSendEmail);

				if (!(pc && socketRef.current)) {
					return;
				}

				pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };

				try {
					await pc.setRemoteDescription(new RTCSessionDescription(sdp));

					console.log('answer set remote description success');

					const localSdp = await pc.createAnswer({
						offerToReceiveVideo: true,
						offerToReceiveAudio: true,
					});

					await pc.setLocalDescription(new RTCSessionDescription(localSdp));

					socketRef.current.emit('answer', {
						sdp: localSdp,
						answerSendID: socketRef.current.id,
						answerReceiveID: offerSendID,
					});
				} catch (e) {
					console.error(e);
				}
			},
		);

		socketRef.current.on(
			'getAnswer',
			(data) => {
				const { sdp, answerSendID } = data;

				console.log('get answer');

				const pc = pcsRef.current[answerSendID];

				if (!pc) {
					return;
				}

				pc.setRemoteDescription(new RTCSessionDescription(sdp));
			},
		);

		socketRef.current.on(
			'getCandidate',
			async (data) => {
				console.log('get candidate');

				const pc = pcsRef.current[data.candidateSendID];

				if (!pc) {
					return;
				}

				await pc.addIceCandidate(new RTCIceCandidate(data.candidate));

				console.log('candidate add success');
			},
		);

		socketRef.current.on(
			'getTranslate',
			async (data) => {
				setTranslated({
					...translated,
					[data.translateSendEmail]: data.translatedText,
				})
			},
		);

		socketRef.current.on('user_exit', (data) => {
			console.log("user_exit");

			if (!pcsRef.current[data.id]) {
				return;
			}

			pcsRef.current[data.id].close();

			delete pcsRef.current[data.id];

			setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
		});

		return async () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
			}

			users.forEach((user) => {
				if (!pcsRef.current[user.id]) {
					return;
				}

				pcsRef.current[user.id].close();

				delete pcsRef.current[user.id];
			});
		};
	}, [createPeerConnection, getLocalStream]);

	useEffect(() => {
		socketRef.current.emit('translate', {
			translateSendEmail: nowUser.memberMail,
			translatedText: propagate,
		});
	}, [propagate]);

	useEffect(() => {
		if (localStreamRef.current) {
			const VideoTrack = localStreamRef.current.getTracks().find(track => track.kind === 'video');
			if (VideoTrack instanceof Object) VideoTrack.enabled = videoOn;
		}
	}, [videoOn]);

	useEffect(() => {
		if (localStreamRef.current) {
			const AudioTrack = localStreamRef.current.getTracks().find(track => track.kind === 'audio');
			if (AudioTrack instanceof Object) AudioTrack.enabled = headsetOn;
		}
	}, [headsetOn]);

	return (

		<VideoCarousel props={{
			list: [
				<S.VideoListItem key={-1}>
					<video
						muted
						ref={localVideoRef}
						autoPlay
					/>
				</S.VideoListItem>,
				...users.map((user, index) => (
					<ChatVideo key={index} email={user.email} stream={user.stream} translated={translated[user.email]} translateOn={translateOn} />
				))
			]
		}} />
	);
};
