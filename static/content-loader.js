function loadAll() {
    load();
}

function load() {
    var host = window.document.location.host.replace(/:.*/, '');
    var client = new Colyseus.Client('ws://' + host + (location.port ? ':' + location.port : ''));
    $.ajax({
        type: "get",
        url: "/api/getuser/" + client.id,
        dataType: "json",
        success: function(response) {
            var info = response.message;
            info.stats.numLost = info.stats.numGamesPlayed - (info.stats.numWon + info.stats.numDrew);
            console.log(info);
            set_welcome(info);
            set_usr_note(info);
            set_stats_panel(info);
            set_achievements_panel(info);
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function set_welcome(info) {
    var template = $("#wel_template").html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, info);
    $("#wel_panel").html(rendered);
}

function set_usr_note(info) {
    var template = $("#usr_note_template").html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, info);
    $("div.pull-right").prepend(rendered);
}

function set_stats_panel(info) {
    var template = $("#stats_template").html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, info.stats);
    $("#stats_panel").html(rendered);
}

function set_achievements_panel(info) {
    var template = $("#achievement_template").html();
    Mustache.parse(template);
    var achievements = info.achievements;
    var rendered = Mustache.render(template, info);
    $("#achievements_panel").html(rendered);
}