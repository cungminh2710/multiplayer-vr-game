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
            console.log(response.message);
            set_welcome(response.message);
            set_usr_note(response.message);
            set_stats_panel(response.message);
            set_achievements_panel(response.message);
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function set_welcome(message) {
    var template = $("#wel_template").html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, message);
    $("#wel_panel").html(rendered);
}

function set_usr_note(message) {
    var template = $("#usr_note_template").html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, message);
    $("div.pull-right").prepend(rendered);
}

function set_stats_panel(message) {
    var template = $("#stats_template").html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, message.stats);
    $("#stats_panel").html(rendered);
}

function set_achievements_panel(message) {
    var template = $("#achievement_template").html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, message.stats);
    $("#achievements_panel").html(rendered);
}