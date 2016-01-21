/**
 * http://usejsdoc.org/
 */


var getTwoFiguresPage = function (page) {
	if(page < 10) { return '0' + page; }
	else { return '' + page; }
}


var getThreeFiguresPage = function (page) {
	if(page < 10) { return '00' + page; }
	else if(page >= 10 && page < 100) { return '0' + page; }
	else { return '' + page; }
}

var getPrevPage = function (page) {
	if(isShowTwoPages)
		return getThreeFiguresPage(parseInt(page) -2);
	else
		return getThreeFiguresPage(parseInt(page) - 1);
};

var getNextPage = function (page) {
	if(isShowTwoPages)
		return getThreeFiguresPage(parseInt(page) + 2);
	else
		return getThreeFiguresPage(parseInt(page) + 1);
};


var goPage = function () {
	var page = parseInt(document.getElementById('txtPage').value);
	if (!isNaN(page)) {
		$(location).attr('href', getThreeFiguresPage(page));
	}
	else {
		alert('number only!!');
	}
}

var isShowTwoPages = false;
var isMouseOn = false;
var pageX;

var initButton = function () {

	$('#btnNextBook').click(function (e) {
		if(isShowTwoPages) {
			window.location.href = '/viewer2/' + bookName + '/' + getTwoFiguresPage(parseInt($('#hidBookNo').val()) + 1);
		}
		else {
			window.location.href = '/viewer/' + bookName + '/' + getTwoFiguresPage(parseInt($('#hidBookNo').val()) + 1);
		}
	});
	
	$('#btnFirst').click(function (e) {
		window.location.href = "001";
	});
	
	$('#btnPrev').click(function (e) {
		window.location.href = getPrevPage($('#hidCurrentPage').val());
	});
	
	$('#btnNext').click(function (e) {
		window.location.href = getNextPage($('#hidCurrentPage').val());
	});
	
	$('#imgMain').click(function (e) {
		window.location.href = getNextPage($('#hidCurrentPage').val());
	})
	
    $('#txtPage').keypress(function (e) {
    	if(e.which == 13) {
    		goPage();
    	}
    });
    
	$('#chkShowTwoPages').click(function (e) {
		if(isShowTwoPages) {
			isShowTwoPages = false;
			window.location.href = '/viewer/' + bookName + '/' + bookNo + '/' + getThreeFiguresPage(currentPage);
		}
		else {
			isShowTwoPages = true;
			window.location.href = '/viewer2/' + bookName + '/' + bookNo + '/' + getThreeFiguresPage(currentPage);
		}
	});
	
	$('a.list-item').click(function (e) {
		window.location.href = document.URL + '/' + $(this).text();
	});
	
	$('a.list-go-viewer').click(function (e) {
		
		if(!bookName || bookName == '')
			bookName = $(this).prev().text();
		
		if(!bookNo || bookNo == '')
			bookNo = '01';
		window.location.href = 'http://' + document.domain + '/viewer/' + bookName + '/' + bookNo;
	});
};

var bookName;
var bookNo;
var currentPage;

var initPage = function () {

	bookName = $('#hidName').val();
	bookNo = $('#hidBookNo').val();
	currentPage = parseInt($('#hidCurrentPage').val());
	
	if ($('#chkShowTwoPages').is(':checked')) {
		
		isShowTwoPages = true;
		var nextPage = getThreeFiguresPage(currentPage + 1);
		
		$('#imgMain tr').prepend('<td><img id="imgMainLeft" src="/comics/' + bookName  + '/' + bookNo + '/' + nextPage + '" /></td>')
	}
	else {
		isShowTwoPages = false;
	}
};

$( document ).ready(function() {

	initPage();
	initButton();
});
