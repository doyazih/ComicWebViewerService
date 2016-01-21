
var fs = require('fs');
var path = require('path');
var config = require('../app.config');

var ROOT_PATH = config.RootPath;
	
/*
 * GET home page.
 */

exports.index = function (req, res){
  res.render('index', { title: 'Yao\'s home' });
};

exports.viewer = function (req, res){
	
	var bookName = req.params.name;
	var bookNo = req.params.bookno ? req.params.bookno : '01';
	var page = req.params.page ? req.params.page : '001';
	
	if (!req.params.bookno) {
		res.redirect(req.url + '/01/001');
	}
	else if (!req.params.page) {
		res.redirect(req.url + '/001');
	}
	else
	{
		res.render('viewer', { name: bookName, bookno: bookNo, page: page });
	}
};

exports.viewer2 = function (req, res){
	
	var bookName = req.params.name;
	var bookNo = req.params.bookno ? req.params.bookno : '01';
	var page = req.params.page ? req.params.page : '001';
	
	if (!req.params.bookno) {
		res.redirect(req.url + '/01/001');
	}
	else if (!req.params.page) {
		res.redirect(req.url + '/001');
	}
	else
	{
		res.render('viewer', { name: bookName, bookno: bookNo, page: page, chkShowTwoPages: true });
	}
	
};

exports.comics = function (req, res){
	res.sendfile(path.join(ROOT_PATH, req.params.name, req.params.bookno, req.params.page));
};

exports.list = function (req, res) {

	var pageType = 'list';
	var bookName = req.params.name ? req.params.name : '';
	var bookNo = req.params.bookno ? req.params.bookno : '';
	
	var bookPath = ROOT_PATH;
	
	if (bookName)
	{
		pageType = 'book';
		bookPath = path.join(bookPath, bookName);
	}
	
	if (bookNo)
	{
		pageType = 'bookNo';
		bookPath = path.join(bookPath, bookNo);
	}
	
	fs.readdir(bookPath, function (err, items) {
		
		var list = new Array();
		
		var availableExt = ['.jpg', '.png'];
		
		if (items && Array.isArray(items) && items.length > 0)
		{
			items.map(function (item) {
		        return path.join(bookPath, item);
		    }).filter(function (fullPath) {
		        return (fs.statSync(fullPath).isDirectory() 
		        		|| (fs.statSync(fullPath).isFile() && availableExt.indexOf(path.extname(fullPath) >= 0))
		        		);
		    }).forEach(function (dirPath) {
		    	list.push(dirPath.replace(bookPath + '/', ''));
		    });
		}

		res.render('list', { path: bookPath, items: list, name: bookName, bookno: bookNo });
	});
};