var host = location.hostname.search("rth.app") !== -1 ? "gem" : "github",
	map = {
		github: {
			hp: "https://icedwatermelonjuice.github.io/HMOSHomePage",
			cu: "https://icedwatermelonjuice.github.io/URL-change-tool",
			qr: "https://icedwatermelonjuice.github.io/QRcode-Tool",
			op: "https://icedwatermelonjuice.github.io/Online-Player",
			dp: "https://icedwatermelonjuice.github.io/DND-Parse",
			ua: "https://icedwatermelonjuice.github.io/UA-test",
			md: "https://icedwatermelonjuice.github.io/Message-Drop",
			default: "https://github.com/IcedWatermelonJuice"
		},
		gem: {
			hp: "https://gem-hp.rth.app",
			cu: "https://gem-cu.rth.app",
			qr: "https://gem-qr.rth.app",
			op: "https://gem-op.rth.app",
			dp: "https://gem-dp.rth.app",
			ua: "https://gem-ua.rth.app",
			md: "https://gem-md.rth.app",
			default: "https://github.com/IcedWatermelonJuice"
		},
		logo: {
			svg: `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><title>$title</title><path d="$path" fill="none" style="stroke:currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
			hp: `M9 18V42H39V18L24 6L9 18Z M19 29V42H29V29H19Z M9 42H39`,
			cu: `M30 19H20C15.5817 19 12 22.5817 12 27C12 31.4183 15.5817 35 20 35H36C40.4183 35 44 31.4183 44 27C44 24.9711 43.2447 23.1186 42 21.7084 M6 24.2916C4.75527 22.8814 4 21.0289 4 19C4 14.5817 7.58172 11 12 11H28C32.4183 11 36 14.5817 36 19C36 23.4183 32.4183 27 28 27H18`,
			qr: `M20 6H6V20H20V6Z M20 28H6V42H20V28Z M42 6H28V20H42V6Z M29 28V42 M41 28V42`,
			op: `M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z M20.5 28V21.9378L25.75 24.9689L31 28L25.75 31.0311L20.5 34.0622V28Z M6 15H42 M33 6L27 15 M21 6L15 15`,
			dp: `M44 4H4V20H44V4Z M44 28H4V44H44V28Z M13 10H11C10.4477 10 10 10.4477 10 11V13C10 13.5523 10.4477 14 11 14H13C13.5523 14 14 13.5523 14 13V11C14 10.4477 13.5523 10 13 10Z M13 34H11C10.4477 34 10 34.4477 10 35V37C10 37.5523 10.4477 38 11 38H13C13.5523 38 14 37.5523 14 37V35C14 34.4477 13.5523 34 13 34Z M21 10H19C18.4477 10 18 10.4477 18 11V13C18 13.5523 18.4477 14 19 14H21C21.5523 14 22 13.5523 22 13V11C22 10.4477 21.5523 10 21 10Z M21 34H19C18.4477 34 18 34.4477 18 35V37C18 37.5523 18.4477 38 19 38H21C21.5523 38 22 37.5523 22 37V35C22 34.4477 21.5523 34 21 34Z`,
			ua: `M8 6a2 2 0 0 1 2 -2h28a2 2 0 0 1 2 2v36a2 2 0 0 1 -2 2h-28a2 2 0 0 1 -2 -2z M24 19C26.2091 19 28 17.2091 28 15C28 12.7909 26.2091 11 24 11C21.7909 11 20 12.7909 20 15C20 17.2091 21.7909 19 24 19Z M30 25C30 21.6863 27.3137 19 24 19C20.6863 19 18 21.6863 18 25 M18 31H30 M18 37H25`,
			md: `M4 39H44V24V9H24H4V24V39Z M4 9L24 24L44 9 M24 9H4V24 M44 24V9H24`,
			default: `M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z M15 33L19.5 19.5L33 15L28.5 28.5L15 33Z M24 26C25.1046 26 26 25.1046 26 24C26 22.8954 25.1046 22 24 22C22.8954 22 22 22.8954 22 24C22 25.1046 22.8954 26 24 26Z`
		}
	};
function copy(data,alertFlag=true){
	data=$(`<textarea style="height:0;width:0"></textarea>`).val(typeof data==="string"?data:String(data));
	$("body").append(data)
	data.select();
	document.execCommand("copy");
	if(alertFlag){
		alert("已复制到剪贴板");
	}
	console.log("以下已复制到剪贴板:\n"+data.val());
	data.remove();
}
function matchLogo(query) {
	if (query.matches) { // 媒体查询
		$(".nav a").each((i, e) => {
			e = $(e);
			e.html(map.logo.svg.replace("$title", e.text()).replace("$path", map.logo[e.attr("site")]))
		})
	} else {
		$(".nav a").each((i, e) => {
			e = $(e);
			e.text(e.text());
		})
	}
}

function matchSite(url) {
	url = new URL(url)
	for (let i in map) {
		for (let j in map[i]) {
			let t = new URL(map[i][j]);
			if (url.hostname === t.hostname && url.pathname === t.pathname) {
				return j
			}
		}
	}
	return "default";
}

function show(e) {
	e = e instanceof jQuery ? e : $(e);
	e.removeAttr("hidden");
	return e;
}

function hide(e) {
	e = e instanceof jQuery ? e : $(e);
	e.attr("hidden", "");
	return e;
}

function selectNav(e) {
	e = e instanceof jQuery ? e : $(e);
	console.log("当前页 : " + e.text())
	e.attr("select", "")
	e.siblings().removeAttr("select");
}

function iframeLoad(url, extraParams) {
	url = url instanceof URL ? url : new URL(url);
	if (extraParams) {
		try {
			for (let i in extraParams) {
				url.searchParams.set(i, extraParams[i]);
			}
		} catch (e) {
			console.log("iframeLoad 参数错误", e);
		}
	}
	show("#app .state-msg");
	hide("#app iframe[name=app-if]");
	$("#app iframe[name=app-if]").attr("src", "").attr("src", url.href);
}
$("body").ready(() => {
	//先加载iframe，其他稍后再说
	$("#app iframe[name=app-if]")[0].onload = function() {
		hide("#app .state-msg");
		show("#app iframe[name=app-if]");
	}
	iframeLoad(map[host][$(".nav a[select]").attr("site")], {
		"jump": "parent"
	})
	//导航栏
	$(".nav a").each((i, e) => {
		e.href = "javascript:void(0);";
		e.onclick = function() {
			let url = "";
			if ($(e).attr("select") === undefined) {
				url = new URL(map[host][$(this).attr("site")]);
				url.searchParams.set("jump", "parent");
				selectNav(this);
				iframeLoad(url);
			} else {
				if($(`#app .iframe-controller`).attr("hidden")===undefined){
					hide(`#app .iframe-controller`).removeAttr("url-data");
				}else{
					url = $("#app iframe[name=app-if]").attr("src");
					show(`#app .iframe-controller`).attr("url-data", url);
				}
			}
		}
	})
	$("#app .iframe-controller .iframe-controller-exit").click((e) => {
		hide(`#app .iframe-controller`).removeAttr("url-data");
	})
	$("#app .iframe-controller .iframe-controller-list .list-item").click((e) => {
		switch ($(e.currentTarget).attr("fn-data")) {
			case "refresh":
				iframeLoad($("#app iframe[name=app-if]").attr("src"));
				break;
			case "new":
				iframeLoad(map[host][$(".nav a[select]").attr("site")], {
					"jump": "parent"
				})
				break;
			case "copy":
				copy($("#app iframe[name=app-if]").attr("src"));
				break;
			case "open":
				open($("#app iframe[name=app-if]").attr("src"),"_self");
				break;
		}
		hide("#app .iframe-controller")
	})
	//iframe传递信息
	window.addEventListener('message', (e) => {
		if (e.data.url) {
			$("#app iframe[name=app-if]").attr("src", e.data.url);
			selectNav($(`.nav a[site=${matchSite(e.data.url)}]`))
		}
	}, false);
	var widthQuery = window.matchMedia("(max-width: 950px)")
	matchLogo(widthQuery) // 执行时调用的监听函数
	widthQuery.addListener(matchLogo) // 状态改变时添加监听器
})
