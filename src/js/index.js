var cheerio = require('cheerio'),
	  fs = require('fs'),
	  linkprefix = "http://www.rusprofile.ru";
var checkedID = [];
var data;


$('#start').click(function(){
	var startURL = $("#link").val();
	alert("Возможно, придется подождать");
	var ttl = 2; // На какую глубину смотрим. Глубже двух нет смысла смотреть.	
	checkedID = [];
	data = getAllChilds(startURL,ttl);
	$("#jstree_demo_div").remove();
	$("<div id='jstree_demo_div'>").appendTo("#tree");
	$('#jstree_demo_div').on('changed.jstree', function (e, data) {
		if(data.node.text.indexOf("http") != -1){
			window.open(data.node.text);
		}
		if (data.node.text.indexOf("Построить дерево отсюда") != -1){
			var link = data.node.text.match(/\(.*\)/)+'';
			link = link.replace(/[\(\)]/g,'');
			$("#link").val(link);
			$("#start").click();			
		}
	}).jstree({
		 'core' : {
			 'data' : [
				 {
					'text' : "Корень",
					'state' : {'opened' : true},
					'children' : data
				 }
			 ]
		 }
 	});
});

function getRemote(url) {
    return $.ajax({
        type: "GET",
        url: url,
        async: false
    }).responseText;
}

function getAllChilds(url,ttl){
	var id = url.match(/\d+/)-0;
	if (ttl <= 0 || checkedID.includes(id)){
		return [];
	}
	console.log('Пробую ' + url + ' ttl = ' + ttl);
	checkedID.push(id);
	var childs = [];
	
	var req = getRemote(url);
	var $$ = cheerio.load(req);

	var first5records = $$(".aff-block");
	if (first5records.length > 0){
		first5records.each(function(i,el){
			var temp = {};
			var link = $$("a", el);
			temp.text = link.text().trim();
			temp.children = [];
			var searchprop = {"icon" : "fas fa-search resize"};
			searchprop.text = 'Построить дерево отсюда (' + linkprefix + link.attr("href") + ')';
			temp.children.push(searchprop);
			var linkprop = {"icon" : "fas fa-external-link-alt resize"};
			linkprop.text = linkprefix + link.attr("href");
			temp.children.push(linkprop);
			var manprop = {"icon" : "fas fa-user resize"};
			var man = $$(".aff-topceo", el);
			manprop.text = man.text().trim();
			temp.children.push(manprop);
			var ch = getAllChilds(linkprefix + link.attr("href"),ttl-1);
			var chprop = { text : "Потомки" , children : ch};
			temp.children.push(chprop);
			childs.push(temp);
		})
	}
	console.log('\tНормально отработал первые пять');
	console.log('\tПытаюсь отправить следующий запрос: с id = ' + id);
	req = getRemote('http://www.rusprofile.ru/ajax.php?action=company_info&id=' + id + '&data=similar');
	var elseRecords = [];

	try {
		elseRecords = JSON.parse(req);	
	} catch(err) {};

	if (elseRecords.length > 0){
		for (var el of elseRecords){
			var temp = {};
			temp.text = el.name;
			temp.children = [];
			var searchprop = {"icon" : "fas fa-search resize"};
			searchprop.text = 'Построить дерево отсюда (' + linkprefix + '/id/' + el.id + ')';
			temp.children.push(searchprop);
			var linkprop = {"icon" : "fas fa-external-link-alt resize"};
			linkprop.text = linkprefix + '/id/' + el.id;
			temp.children.push(linkprop);
			var manprop = {"icon" : "fas fa-user resize"};
			manprop.text = el.ceo_name;
			temp.children.push(manprop);
			var ch = getAllChilds(linkprefix + '/id/' + el.id,ttl-1);
			var chprop = { text : "Потомки" , children : ch};
			temp.children.push(chprop);
			childs.push(temp);
		}
	}

	return childs;
}