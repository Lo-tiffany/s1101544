$(function(){
    var oPointer = document.getElementsByTagName("img")[0];
									var oTurntable = document.getElementsByTagName("img")[1];
									var cat = 51.4; //總共7個扇形區域，每個區域約51.4度
									var num = 0; //轉圈結束後停留的度數
									var offOn = true; //是否正在抽獎
									oPointer.onclick = function () {
										if (offOn) {
											oTurntable.style.transform = "rotate(0deg)";
											offOn = !offOn;
											ratating();
										}
									}
									//旋轉
									function ratating() {
										var timer = null;
										var rdm = 0; //隨機度數
										clearInterval(timer);
										timer = setInterval(function () {
											if (Math.floor(rdm / 360) < 3) { rdm = Math.floor(Math.random() * 3600); }
											else {
												oTurntable.style.transform = "rotate(" + rdm + "deg)";
												clearInterval(timer);
												setTimeout(function () {
													offOn = !offOn;
													num = rdm % 360;
													if (num <= cat * 1) { alert("拉麵"); console.log("rdm=" + rdm + "，num=" + num + "，" + "4999元"); }
													else if (num <= cat * 2) { alert("咖哩飯"); console.log("rdm=" + rdm + "，num=" + num + "，" + "50元"); }
													else if (num <= cat * 3) { alert("水餃"); console.log("rdm=" + rdm + "，num=" + num + "，" + "10元"); }
													else if (num <= cat * 4) { alert("飯糰"); console.log("rdm=" + rdm + "，num=" + num + "，" + "5元"); }
													else if (num <= cat * 5) { alert("義大利麵"); console.log("rdm=" + rdm + "，num=" + num + "，" + "免息服務"); }
													else if (num <= cat * 6) { alert("漢堡"); console.log("rdm=" + rdm + "，num=" + num + "，" + "提交白金"); }
													else if (num <= cat * 7) { alert("減肥"); console.log("rdm=" + rdm + "，num=" + num + "，" + "未中獎"); }
												}, 4000);
											}
										}, 30);
									}
});