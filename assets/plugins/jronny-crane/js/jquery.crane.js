jQuery(function($) {
    let maxAttempts = 3;
    let attempts = 0;
    var craneAnimationDuration = 2000;
    var prizeAnimationDuration = 800;
    var craneEasing = '';
    var prizeEasing = '';

    function showRemainingAttempts() {
        let remainingAttempts = maxAttempts - attempts;
        let content = remainingAttempts + " " + ((remainingAttempts > 1) ? " remaining attempts" : "remaining attempt");
        $(".crane-game-attempts").text(content);
        if(remainingAttempts > 0) {
            $(".btn-crane-play").removeClass("disabled");
        } else {
            $(".div-crane-controls").slideUp();
        }
    }
    showRemainingAttempts();

    $.Velocity.RegisterEffect("shake", {
        defaultDuration: 400,
        calls: [
            [ { translateX: -2 }, 0.125 ],
            [ { translateX: 2 }, 0.125 ],
            [ { translateX: -2 }, 0.125 ],
            [ { translateX: 0 }, 0.125 ]
        ]
    });

    $(".btn-crane-play, .btn-crane-try-again").click(function (e) {
        $(".btn-crane-play").addClass("disabled");
        $(".crane-alert-message").hide();

        let moveTo = $(".crane-game").width() * .75;
        $(".crane-arm").velocity({ left: moveTo }, { duration: craneAnimationDuration })
            .velocity("shake")
            .velocity({ paddingTop: 300 }, {
                duration: craneAnimationDuration,
                complete: function() {
                    attempts++;
                    if(attempts > 1) {
                        let winOn2ndTry = ~~(Math.random() * 2);
                        if(winOn2ndTry || attempts > 2) {
                            $(".crane-arm-claw").append('<div class="crane-prize"></div>');
                        }
                    }
                }
            })
            .velocity("shake")
            .velocity({ paddingTop: 60 }, { duration: craneAnimationDuration })
            .velocity({ left: 0 }, {
                duration: craneAnimationDuration,
                complete: function() {
                    $(this).velocity("shake", {
                        complete: function() {
                            let isWin = $(".crane-prize").length;
                            if(isWin) {
                                attempts = maxAttempts; // no more attempts allowed
                                $(".crane-prize").velocity({ 
                                    top: 300,
                                    rotateZ: "360deg"
                                }, {
                                    duration: prizeAnimationDuration,
                                    complete: function() {
                                        $(this).remove();
                                        $(".crane-alert-win").show();
                                    }
                                });
                            } else {
                                $(".crane-alert-lose").show();
                            }
                            showRemainingAttempts();
                        }
                    });
                    
                }
            });
    });
})