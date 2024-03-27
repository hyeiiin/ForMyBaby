package com.ssafy.c202.formybaby.sleep.controller;

import com.ssafy.c202.formybaby.sleep.Dto.response.DangerCntResponse;
import com.ssafy.c202.formybaby.sleep.Dto.response.DangerReadResponse;
import com.ssafy.c202.formybaby.sleep.service.DangerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/danger")
public class DangerController {

    private final DangerService dangerService;

    @GetMapping("/")
    public ResponseEntity<List<DangerReadResponse>> selectWeekDangerList(@RequestParam Long babyId, @RequestParam String endDate) {
        try {
            List<DangerReadResponse> dangerReadResponseList = dangerService.selectWeekDangerList(babyId, endDate);
            return new ResponseEntity<>(dangerReadResponseList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/cnt")
    public ResponseEntity<List<DangerCntResponse>> selectWeekDangerCntList(@RequestParam int dangerCnt, @RequestParam String endDate){
        try {
            List<DangerCntResponse> dangerCntResponseList = dangerService.selectWeekDangerCntList(dangerCnt, endDate);
            return new ResponseEntity<>(dangerCntResponseList, HttpStatus.OK);
        } catch (Exception e) {
            return  new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}