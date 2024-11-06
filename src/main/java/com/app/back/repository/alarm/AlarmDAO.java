package com.app.back.repository.alarm;

import com.app.back.domain.alarm.AlarmDTO;
import com.app.back.mapper.alarm.AlarmMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AlarmDAO {
    private final AlarmMapper alarmMapper;

    public void saveVtApplicationAlarm(Long memberId, Long vtApplicationId, String content) {
        alarmMapper.insertVtApplicationAlarm(memberId, vtApplicationId, content);
    }
    public void saveDonationAlarm(Long memberId, Long donationId, String content) {
        alarmMapper.insertDonationAlarm(memberId, donationId, content);
    }

    public void saveSupportAlarm(Long memberId, Long supportId, String content) {
        alarmMapper.insertSupportAlarm(memberId, supportId, content);
    }

    public void saveReplyAlarm(Long memberId, Long replyId, String content) {
        alarmMapper.insertReplyAlarm(memberId, replyId, content);
    }

    public List<AlarmDTO> findAlarmsByMemberId(Long memberId) {
        return alarmMapper.selectAlarmsByMemberId(memberId);
    }
}
