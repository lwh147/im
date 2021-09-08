package com.im.service;

import com.im.mapper.OutrecordMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @ClassName OutrecordService
 * @Description 出库记录类服务
 * @Author lwh
 * @Date 2020/7/15 14:23
 * @Version 1.0
 **/
@Service
public class OutrecordService {
    @Resource
    private OutrecordMapper outrecordMapper;

    public void insertOurrecord(String time, String cid, int num) {
        outrecordMapper.insertOutrecord(time, cid, num);
    }
}
