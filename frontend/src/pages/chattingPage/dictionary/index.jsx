import * as S from './style';

export default function Dictionary({ props: { dictionaryClicked } }) {
    return (
        <S.Section dictionaryClicked={dictionaryClicked}>
            <S.SectionHeader>
                <h3>Dictionary</h3>
            </S.SectionHeader>
        </S.Section>
    )
}
