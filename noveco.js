////////////////////////////////////////////////////////////////////////

var noveco_fontsize = 1.0;
var noveco_col_corp_turk   = "#82baba";
var noveco_col_corp_rose   = "#c395ac";
var noveco_col_corr_red    = "#ffb5b5";
var noveco_col_corr_green  = "#b5ffba";
var noveco_col_corr_yellow = "#ffffcc";
var noveco_col_corr_white  = "#ffffff";
var noveco_col_corr_gray   = "#eeeeee";

////////////////////////////////////////////////////////////////////////

function noveco_row_check(num, all, reward)
{
	var sum_ok = 0;
	var click_ok = 0;
	for (i = 0; i < all; i++)
	{
		$(".noveco-row" + i).each(
			(index, elem) => {
				if (elem.checked)
				{
					if ($(elem).hasClass("noveco-solution"))
					{
						if (i == num)
						{
							click_ok = 1;
						}
						sum_ok = sum_ok + 1;
						$(elem).css({"outline-color" : noveco_col_corr_green});
					}
					else
					{
						$(elem).css({"outline-color" : noveco_col_corr_red});
					}
				}
				else
				{
					$(elem).css({"outline-color" : noveco_col_corr_gray});
				}
			}
		);
	}
	delem = $("#noveco-display");
	if (sum_ok == all)
	{
		delem.show();
		delem.css({"background" : noveco_col_corr_green});
		delem.html("<span>" + reward + "</span>");
	}
	else
	{
		if (click_ok)
		{
			delem.css({"background" : noveco_col_corr_yellow});
			delem.html("<span class='noveco-reward-sum'>" + sum_ok + " / " + all + "</span><br><span class='noveco-reward-next'>" + reward + "</span>");
		}
		else
		{
			delem.css({"background" : noveco_col_corr_white});
			delem.html("<span>" + sum_ok + " / " + all + "</span>");
		}
	}
};

////////////////////////////////////////////////////////////////////////

function noveco_input_check(num, reward)
{
	var ielem = $("#noveco-input" + num);
	var selem = $("#noveco-solution" + num);
	var helem = $("#noveco-hint" + num);
	var text = $.trim(ielem.val());
	var sol = $.trim(selem.val());
	if (text == sol)
	{
		color_str = noveco_col_corp_turk;
	}
	else if (
		text.toLowerCase() == sol.substr(0, text.length).toLowerCase() ||
		text == sol.substr(0, text.length) ||
		text.toLowerCase() == sol.toLowerCase()
	)
	{
		color_str = noveco_col_corr_yellow;
	}
	else
	{
		color_str = noveco_col_corr_red;
	}
	ielem.css({"background" : color_str});
	var len = Math.min(text.length, sol.length);
	if (text == sol)
	{
		helem.show();
		helem.html("<span class='noveco-reward-sol'>" + reward + "</span>");
	}
	else
	{
		var hint = "";
		var wrong = 0;
		for (i = 0; i < len; i++)
		{
			if (sol[i] == " ")
			{
				if (text[i] != " ")
				{
					wrong += 1;
				}
				hint += " ";
			}
			else if (text[i] == sol[i])
			{
				hint += text[i];
				wrong = 1;
			}
			else if (text[i].toLowerCase() == sol[i].toLowerCase())
			{
				hint += "<span class='noveco-hint-case'>" + text[i] + "</span>";
				wrong = 1;
			}
			else if (wrong > 0 && wrong % 2 == 0)
			{
				hint += "<span class='noveco-hint-letter'>" + sol[i] + "</span>";
				wrong += 1;
			}
			else
			{
				hint += "<span class='noveco-hint-place'></span>";
				wrong += 1;
			}
		}
		if (text.length < sol.length)
		{
			for (i = text.length; i < sol.length; i++)
			{
				if (sol[i] == " ")
				{
					hint += "<span class='noveco-hint-space'> </span>";
				}
				else
				{
					hint += "<span class='noveco-hint-place'></span>";
				}
			}
		}
		for (i = sol.length; i < text.length; i++)
		{
			hint += "<span class='noveco-hint-overflow'>&#9679;</span>";
		}
		helem.html(hint);
	}
};

////////////////////////////////////////////////////////////////////////

function noveco_audiovol(volval)
{
	$("audio").each((index, elem) => {
		elem.volume = volval/100.0;
	});
	$("#noveco-audiovol").text(volval);
}

function noveco_reclen(delay)
{
	$("#noveco-reclen").text(delay);
}

////////////////////////////////////////////////////////////////////////

function noveco_fontsize_inc()
{
	noveco_fontsize += 0.01;
	if (noveco_fontsize > 1.1)
	{
		noveco_fontsize = 1.1;
	}
	$("#noveco-content *").css({"font-size" : noveco_fontsize + "em"});
}

function noveco_fontsize_dec()
{
	noveco_fontsize -= 0.01;
	if (noveco_fontsize < 0.9)
	{
		noveco_fontsize = 0.9;
	}
	$("#noveco-content *").css({"font-size" : noveco_fontsize + "em"});
}

////////////////////////////////////////////////////////////////////////

function noveco_show_umlautbtn(num)
{
	$(".noveco-umlaut").hide();
	$("#noveco-umlaut" + num).show();
}

function noveco_input_umlaut(num, text)
{
	var ielem = $("#noveco-input" + num);
	ielem.val(ielem.val() + text);
	ielem.focus();
	ielem.change();
}

////////////////////////////////////////////////////////////////////////

function noveco_audio_play(num, gap_time = 0)
{
	var audio_duration = 10;
	$(".noveco-audio" + num).each(
		(index, elem) => {
			if (elem.paused)
			{
				setTimeout(() => { elem.play(); }, audio_duration);
				audio_duration += elem.duration*1000.0 + gap_time;
			}
		}
	);
	return audio_duration;
}

function noveco_audio_play_row(num, gap_time = 0)
{
	var audio_duration = noveco_audio_play(num, gap_time);
	$(".noveco-row" + num).show();
	$(".noveco-recorder").each(
		(index, elem) => {
			$(elem).hide();
			setTimeout(() => { $(elem).show(); }, audio_duration);
		}
	);
}
