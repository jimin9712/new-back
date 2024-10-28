package com.app.back.domain.post;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class Pagination {
    private Integer page;          // 현재 페이지 번호
    private int startRow;          // 조회 시작 행 번호 (0부터 시작)
    private int endRow;            // 조회 끝 행 번호
    private int rowCount;          // 한 페이지에 보여줄 게시물 개수
    private int pageCount;         // 한 블록에 보여줄 페이지 개수 (예: 1, 2, 3, 4, 5)
    private int startPage;         // 현재 블록의 시작 페이지 번호
    private int endPage;           // 현재 블록의 끝 페이지 번호
    private int realEnd;           // 전체 페이지의 실제 마지막 페이지 번호
    private boolean prev, next;    // 이전, 다음 페이지 블록 존재 여부
    private int total;             // 전체 게시물 수
    private String order;          // 정렬 기준 (예: 최신순, 인기순 등)
    // 더보기 구현 시, 1개 더 가져오는 변수
    private int moreRowcount;

    public void progress() {
        // 현재 페이지 설정 (null인 경우 1로 초기화)
        this.page = page == null ? 1 : page;
        // 한 페이지에 보여줄 게시물 개수
        this.rowCount = 10;
        // 더보기 구현 시, 다음 페이지의 게시글 1개를 더 가져오기 위해 설정
        this.moreRowcount = rowCount + 1;
        // 한 블록에 보여줄 페이지 수 (예: 1, 2, 3, 4, 5)
        this.pageCount = 5;
        // 조회 끝 행 번호 계산
        this.endRow = page * rowCount;
        // 조회 시작 행 번호 계산
        this.startRow = endRow - rowCount + 1;
        // 현재 블록의 끝 페이지 번호 계산 (예: 10, 20, 30...)
        this.endPage = (int)(Math.ceil(page / (double)pageCount) * pageCount);
        // 현재 블록의 시작 페이지 번호 계산
        this.startPage = endPage - pageCount + 1;
        // 전체 게시물 수에 따른 실제 마지막 페이지 번호 계산
        this.realEnd = (int)Math.ceil(total / (double)rowCount);
        // 실제 마지막 페이지 번호가 현재 블록의 끝 페이지 번호보다 작으면 설정
        if(realEnd < endPage) {
            endPage = realEnd == 0 ? 1 : realEnd;
        }
        // 이전 페이지 블록 존재 여부 설정
        this.prev = startPage > 1;
        // 다음 페이지 블록 존재 여부 설정
        this.next = endPage < realEnd;
        // limit 문법에서 시작 인덱스는 0부터 시작하기 때문에 1 감소해준다.
        this.startRow--;
    }

}
