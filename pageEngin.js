var TemplateEngine = funciton(tpl, data){
	//...
	var re = /<%([^%>]+)?%>/g;
	while(match = re.exec(tpl)){
		tpl = tpl.replace(match[0], data[match[1]]);
	}

	return tpl;
}

var template = '<p> Hello, my name is <%this.name%>. I\'m <%this.profileage%> years old.</p>';
console.log(TemplateEngine(template,{name:'Krasimir', profile:{age:29}}));