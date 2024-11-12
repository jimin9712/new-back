// 필터링된 문의 데이터를 가져오는 함수
const fetchFilteredInquiries = async (page = 1, keyword = inquiryKeyword, filterType = '최신순') => {
    try {
        const response = await fetch(`/admin/inquiry-page?page=${page}&query=${keyword}&filterType=${filterType}`);
        const data = await response.json();

        renderInquiries(data.inquiries);
        renderPagination(data.pagination, keyword, filterType);
        resetSelectAllInquiriesCheckbox();
    } catch (error) {
        console.error("데이터 가져오는 중 오류 발생:", error);
    }
};


// 전체 문의 데이터를 가져오는 함수
const fetchInquiries = async (page = 1) => {
    try {
        const response = await fetch(`/admin/inquiry-page?page=${page}`);
        const data = await response.json();
        renderInquiries(data.inquiries);
        renderPagination(data.pagination);
        resetSelectAllInquiriesCheckbox();
    } catch (error) {
        // 오류 처리
        console.error("데이터 가져오는 중 오류 발생:", error);
    }
};

// 초기 데이터 로드
fetchFilteredInquiries(1, '', '최신순'); // 페이지 1, 빈 검색어, "최신순" 필터
// ==========================================답변하기========================================================
// 문의 조회
const fetchInquiryData = async (inquiryId) => {
    console.log("fetchInquiryData 호출 - ID:", inquiryId); // fetchInquiryData 호출 확인
    try {
        const response = await fetch(`/admin/inquiry-answer?id=${inquiryId}`);
        console.log("fetchInquiryData 응답 상태:", response.ok); // 응답 상태 확인
        if (response.ok) {
            const data = await response.json();
            console.log("fetchInquiryData 응답 데이터:", data); // 응답 데이터 확인
            return data.inquiries[0]; // 문의 데이터를 반환 (inquiries 배열의 첫 요소)
        } else {
            console.error("fetchInquiryData - 문의 데이터를 가져오는 데 실패했습니다.");
        }
    } catch (error) {
        console.error("fetchInquiryData - 에러 발생:", error);
    }
};


// 답변 데이터를 서버로 전송하는 함수
const submitAnswer = async (inquiryId, answerContent) => {
    try {
        const response = await fetch('/admin/inquiry-answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inquiryId, inquiryAnswer: answerContent }),
        });

        if (response.ok) {
            alert("답변이 제출되었습니다.");
            return true;
        } else {
            console.error("답변 제출에 실패했습니다.");
        }
    } catch (error) {
        console.error("답변 제출 중 에러 발생:", error);
    }
    return false;
};

// ======================================================================================= 여기서부터 공지사항
// 공지사항 데이터를 가져오는 함수
const fetchNotices = async (page = 1) => {
    try {
        const response = await fetch(`/admin/notice-list?page=${page}`);
        // JSON 데이터를 HTML로 렌더링
        const data = await response.json();
        renderNotice(data.notices);
        renderNoticePagination(data.pagination); // 페이지네이션 렌더링
    } catch (error) {
        console.error("공지사항 데이터를 불러오는 중 오류 발생:", error);
    }
};
// 공지사항 목록 초기 로드
fetchNotices(); // 초기 공지사항 데이터 로드

//  공지사항 검색
const fetchFilteredNotices = async (page, keyword) => {
    try {
        const response = await fetch(`/admin/notice-list?page=${page}&query=${keyword}`);
        const data = await response.json();
        renderNotice(data.notices); // 공지사항 목록 렌더링
        renderNoticePagination(data.pagination, keyword); // 페이지네이션 렌더링
    } catch (error) {
        console.error("공지사항 데이터를 불러오는 중 오류 발생:", error);
    }
};

// 공지사항 조회
document.querySelector(".notification-list-wrap").addEventListener("click", async (event) => {
    const target = event.target.closest(".notification");
    if (target) {  // 공지사항 아이템이 클릭되었을 때만 실행
        event.preventDefault(); // 페이지 이동 방지
        const noticeId = target.getAttribute("data-id"); // 공지사항 ID 가져오기

        sections.forEach((section) => section.classList.remove("selected")); // 모든 섹션 선택 해제
        // sections은 모든 .admin-page 섹션을 담고있는 nodeList이고, Array.from을 통해서 NodeList를 배열로 변환하여 배열 메서드를 사용할 수 있게 한다.
        const notificationInquirySection = Array.from(sections).find(
            (section) => section.dataset.value === "공지사항 조회"
        );

        if (notificationInquirySection) {
            notificationInquirySection.classList.add("selected"); // 공지사항 조회 섹션에 selected 추가

            const response = await fetch(`/admin/notice-detail?id=${noticeId}`);
            const data = await response.json();

            renderNoticeDetail(data.notice);  // 공지사항 세부 내용 렌더링
        }
    }
});

// 공지사항 세부 내용 조회 함수 정의
const fetchNoticeDetail = async (noticeId) => {
    try {
        const response = await fetch(`/admin/notice-detail?id=${noticeId}`);
        const data = await response.json();
        renderNoticeDetail(data.notice);  // 공지사항 세부 내용 렌더링
    } catch (error) {
        console.error("공지사항 세부 내용을 불러오는 중 오류 발생:", error);
    }
};

// 사이드바에 최신 공지사항 10개 가져오기
const fetchRecentNotices = async () => {
    try {
        const response = await fetch('/admin/notice-list?limit=10'); // 최신 10개 공지사항 가져오기
        const data = await response.json();
        renderSidebarNotices(data.notices); // 가져온 공지사항을 사이드바에 렌더링
    } catch (error) {
        console.error("사이드바 공지사항 불러오기 오류:", error);
    }
};

// 페이지 로드 시 최신 공지사항 10개를 사이드바에 표시
fetchRecentNotices();
//===============================게시글 목록======================================================================
// 필터링된 게시글 데이터를 가져오는 함수
const fetchFilteredPosts = async (page = 1, keyword = postKeyword, filterType = postFilterType) => {
    try {
        const response = await fetch(`/admin/post-list?page=${page}&query=${keyword}&filterType=${filterType}`);
        console.log("서버 응답 상태:", response.ok); // 서버 응답 상태를 확인
        if (response.ok) {
            const data = await response.json();
            console.log("서버로부터 받은 데이터:", data); // 받은 데이터 확인
            renderPosts(data.posts); // 필터링된 데이터를 렌더링
            postPagination(data.pagination, keyword, filterType);
            console.log("필터링 조건:", { page, keyword, filterType });
            resetSelectAllPostsCheckbox(); // 전체 선택 체크박스 해제
        } else {
            console.error("서버 응답 실패:", response.status);
        }
    } catch (error) {
        console.error("필터링 오류:", error); // 오류 처리
    }
};


// 게시글 목록을 가져오는 함수
const fetchPosts = async (page = 1) => {
    try {
        const response = await fetch(`/admin/post-list?page=${page}`);
        const data = await response.json();
        renderPosts(data.posts); // 게시글 목록 렌더링
        postPagination(data.pagination); // 페이지네이션 렌더링
        resetSelectAllPostsCheckbox();  // 전체 선택 체크박스 해제
    } catch (error) {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
    }
};
fetchFilteredPosts(1,'','작성일 순');


// 게시글 조회 함수
const fetchPostDetail = async (postId) => {
    try {
        const response = await fetch(`/admin/post-detail?id=${postId}`);
        const data = await response.json();
        if (data.success) {
            renderPostDetail(data.post); // 받은 데이터를 표시
        } else {
        }
    } catch (error) {
        console.error("게시글 상세 조회 오류:", error);
    }
};
const deleteSelectedPosts = async (selectedIds) => {
    try {
        const response = await fetch("/admin/delete-posts", {
            method: "PATCH",  // PATCH 메서드를 사용하여 부분 업데이트 요청
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedIds),  // 선택된 게시글 ID 배열을 전송
        });

        if (response.ok) {
            alert("선택한 게시글이 삭제되었습니다.");  // 게시글 삭제 성공 메시지
            fetchFilteredPosts();  // 게시글 목록 새로고침
        } else {
            console.error("삭제 실패:", response.status);
        }
    } catch (error) {
        console.error("삭제 요청 중 오류 발생:", error);
    }
};

// =========================================================================== 신고 목록=====================================
// 필터링된 신고 데이터를 가져오는 함수
const fetchFilteredReports = async (page = 1, keyword = reportKeyword, filterType = reportFilterType) => {
    try {
        const response = await fetch(`/admin/report-list?page=${page}&query=${keyword}&filterType=${filterType}`);
        const data = await response.json();

        renderReports(data.reports);
        reportPagination(data.pagination, keyword, filterType);
        console.log(data.pagination.total);
        resetSelectAllReportsCheckbox();
    } catch (error) {
        console.error("신고 데이터를 가져오는 중 오류 발생:", error);
    }
};

const fetchReports = async (page = 1) => {
    try {
        const response = await fetch(`/admin/report-list?page=${page}`);

        const data = await response.json();
        renderReports(data.reports);
        reportPagination(data.pagination);
        resetSelectAllReportsCheckbox();
    } catch (error) {
        console.error("신고 데이터를 가져오는 중 오류 발생:", error);
    }
};

fetchFilteredReports(1,'','신고일 순');


const deleteSelectedReports = async (selectedIds) => {
    try {
        const response = await fetch("/admin/delete-reports", {
            method: "PATCH",  // PATCH 메서드를 사용하여 부분 업데이트 요청
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedIds),  // 선택된 게시글 ID 배열을 전송
        });

        if (response.ok) {
            alert("선택한 게시글이 삭제되었습니다.");  // 삭제 성공 메시지
            fetchFilteredReports();  // 신고 목록 새로고침
        } else {
            console.error("삭제 실패:", response.status);
        }
    } catch (error) {
        console.error("삭제 요청 중 오류 발생:", error);
    }
};

// 상태 변경 버튼 클릭 이벤트
const updateSelectedReportStatus = async (selectedIds) => {

    // PATCH 요청으로 상태 변경
    try {
        const response = await fetch("/admin/update-report-status", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({selectedIds }),
        });

        if (response.ok) {
            alert("선택한 신고 항목의 상태가 'COMPLETE'로 변경되었습니다.");
            fetchFilteredReports(); // 목록 새로고침
        } else {
            console.error("상태 변경 실패:", response.status);
        }
    } catch (error) {
        console.error("상태 변경 요청 중 오류 발생:", error);
    }
};





















