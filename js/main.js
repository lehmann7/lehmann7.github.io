function animate_hero()
{
	let num = $(".hero-slogan").length;
	$(".hero-slogan").each((k,e) => {
		let el = $(e);
		setTimeout(() => {
			el.show();
			el.removeClass("fadeOutRightBig");
			el.addClass("fadeInLeftBig");
		}, (k+0)*3000, "easeInOutExpo" );
		setTimeout(() => {
			el.removeClass("fadeInLeftBig");
			el.addClass("fadeOutRightBig");
		}, (k+1)*3000, "easeInOutExpo" );
	});
	setTimeout(animate_hero, num*3000);
}

function animate_timer(elem)
{
	let spec = $(elem.children[0]).val().split(" ");
	let dest = $(elem.children[2]);
	let val = Number(dest.html());
	let stop = Number(spec[1]);
	if (val > stop)
	{
		dest.html(val - 1);
	}
	else if (val < stop)
	{
		dest.html(val + 1);
	}
	setTimeout(() => { animate_timer(elem); }, 25.);
}


function animate_nav()
{
	$(".navscroll").waypoint(
		(direction) => {
			let elem = $(".nav");
			if( direction === 'down')
			{
				elem.removeClass("nav-up");
				elem.addClass("nav-down");
			}
			else if( direction === 'up')
			{
				elem.removeClass("nav-down");
				elem.addClass("nav-up");
			}
		},
		{ offset: '10%' }
	);
}

function animate_scroll(eid)
{
	$("#" + eid + " .animated").addClass("fadeOutDown");
	$("#" + eid).waypoint(
		(direction) => {
			if( direction === 'down')
			{
				$("#" + eid + " .animated").removeClass("fadeOutDown");
				$("#" + eid + " .animated").addClass("fadeInUp");
				$("#" + eid + " .section-counter").each((k,e) => { animate_timer(e); });
			}
			else if( direction === 'up')
			{
				$("#" + eid + " .animated").removeClass("fadeInUp");
				$("#" + eid + " .animated").addClass("fadeOutDown");
			}
		},
		{ offset: '75%' }
	);
}

function document_loaded()
{
	setTimeout(() => {
		$(".logo-letter").css("left", "0");
	}, 500.);
	setTimeout(() => {
		$(".logo-letter-0").addClass("fadeIn");
	}, 1250.);
	setTimeout(() => {
		document.body.scrollTop = 0
		document.documentElement.scrollTop = 0;
		animate_hero();
		animate_nav("home");
		animate_scroll("products");
		animate_scroll("service");
		animate_scroll("philosophy");
		animate_scroll("team");
		animate_scroll("social");
		animate_scroll("contact");
		animate_scroll("mushrooms");
		animate_scroll("vitalpowder");
		animate_scroll("microgreens");
		$("#preloader-display").addClass("fadeOut");
		$(".nav-logo").addClass("fadeIn");
	}, 1500.);
	setTimeout(() => {
		$("#preloader-display").hide();
		$("html").css("scroll-behavior", "smooth");
		let strs = String(document.location).split("#");
		if (strs.length > 1)
		{
			$('html').animate({
				scrollTop: ($('#' + strs[1]).offset().top)
			},500);
		}
	}, 2250.);
	init_map();
}
