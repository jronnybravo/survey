(function ( $ ) {
 
    $.fn.countdownTimer = function( options ) {
        var settings = $.extend({
            dateEnd: new Date(),
        }, options );

        let countdownTimer = this;
        countdownTimer.addClass("countdown-timer");

        function refreshCountdownTimer() {
            var endTime = (Date.parse(settings.dateEnd)) / 1000;
            var now = new Date();
            var now = (Date.parse(now) / 1000);
            var timeLeft = endTime - now;
            var days = Math.floor(timeLeft / 86400); 
            var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
            var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
            var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
            if (hours < "10") { hours = "0" + hours; }
            if (minutes < "10") { minutes = "0" + minutes; }
            if (seconds < "10") { seconds = "0" + seconds; }

            countdownTimer.find(".days").html(days + "<span>Days</span>");
            countdownTimer.find(".hours").html(hours + "<span>Hours</span>");
            countdownTimer.find(".minutes").html(minutes + "<span>Minutes</span>");
            countdownTimer.find(".seconds").html(seconds + "<span>Seconds</span>");
        }

        setInterval($.proxy(refreshCountdownTimer, this), 1000);

        return countdownTimer;
    };
 
}( jQuery ));