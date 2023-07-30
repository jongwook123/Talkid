package com.talkids.backend.service;

import com.talkids.backend.entity.Group;

import java.util.List;

public interface GroupService {

    List<Group> getGroupList(int memberId);

}
