package com.im.mapper;

import org.springframework.stereotype.Repository;

/**
 * @InterfaceName outrecord
 * @Description 出库记录表操作记录
 * @Author lwh
 * @Date 2020/7/12 17:09
 * @Version 1.0
 **/
@Repository
public interface OutrecordMapper {
    //增
    public void insertOutrecord(String time, String cid, int num);
}