package com.app.back.mapper.vt_application;

import com.app.back.domain.volunteer.VolunteerVO;
import com.app.back.domain.vt_application.VtApplicationVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VtApplicationMapper {

    // 지원하기 버튼 insert
    public void insert(VtApplicationVO vtApplicationVO);

}
