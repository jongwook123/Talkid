package com.talkids.backend.service;

import com.talkids.backend.entity.Group;
import com.talkids.backend.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;

    // 미완성
    @Override
    public List<Group> getGroupList(int memberId) {
        return null;
    }

}
