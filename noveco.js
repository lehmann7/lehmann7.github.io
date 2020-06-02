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
						$(elem).css({"outline-color" : "#82baba"});
					}
					else
					{
						$(elem).css({"outline-color" : "#c395ac"});
					}
				}
				else
				{
					$(elem).css({"outline-color" : "#eeeeee"});
				}
			}
		);
	}
	delem = $("#noveco-display");
	if (sum_ok == all)
	{
		delem.css({"background" : "#82baba"});
		delem.html("<span>" + reward + "</span>");
	}
	else
	{
		if (click_ok)
		{
			delem.css({"background" : "#ffffee"});
			delem.html("<span>" + sum_ok + " / " + all + "</span><br><span style='font-weight: normal; font-size: small;'>" + reward + "</span>");
		}
		else
		{
			delem.css({"background" : "#ffffff"});
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
		color_str = "#82baba";
	}
	else if (
		text.toLowerCase() == sol.substr(0, text.length).toLowerCase() ||
		text == sol.substr(0, text.length) ||
		text.toLowerCase() == sol.toLowerCase()
	)
	{
		color_str = "#ffffee";
	}
	else
	{
		color_str = "#c395ac";
	}
	ielem.css({"background" : color_str});
	var len = Math.min(text.length, sol.length);
	if (text == sol)
	{
		helem.html("<span style='color: #82baba; font-weight: bold;'>" + reward + "</span>");
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
				hint += "<span style='color: #c395ac; font-weight: bold;'>" + text[i] + "</span>";
				wrong = 1;
			}
			else if (wrong > 0 && wrong % 2 == 0)
			{
				hint += "<span style='color: #82baba; font-weight: bold;'>" + sol[i] + "</span>";
				wrong += 1;
			}
			else
			{
				hint += "<span style='padding-left: 1px; padding-right: 1px; color: #c395ac;'>_</span>";
				wrong += 1;
			}
		}
		if (text.length < sol.length)
		{
			for (i = text.length; i < sol.length; i++)
			{
				if (sol[i] == " ")
				{
					hint += " ";
				}
				else
				{
					hint += "<span style='padding-left: 1px; padding-right: 1px; color: #c395ac;'>_</span>";
				}
			}
		}
		for (i = sol.length; i < text.length; i++)
		{
			hint += "<span style='color: #aaaaaa; font-weight: bold;'>&#9679;</span>";
		}
		helem.html(hint);
	}
};

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

function noveco_audio_play(num, time = 0)
{
	var audio_duration = 10;
	$(".noveco-audio" + num).each(
		(index, elem) => {
			if (elem.paused)
			{
				setTimeout(() => { elem.play(); }, audio_duration);
				audio_duration += elem.duration*1000.0 + time;
			}
		}
	);
}
