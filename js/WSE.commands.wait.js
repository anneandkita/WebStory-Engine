/*<ON_DEPLOY_REMOVE>*/
/* global setTimeout, WSE */
/*
    Copyright (c) 2012 - 2014 The WebStory Engine Contributors
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:
    
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.

    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

    * Neither the name WebStory Engine nor the names of its contributors 
      may be used to endorse or promote products derived from this software 
      without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS BE LIABLE FOR ANY
    DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
    ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
    SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/*</ON_DEPLOY_REMOVE>*/
(function (out)
{
    "use strict";
    
    out.commands.wait = function (command, interpreter)
    {
        var duration, self;

        interpreter.bus.trigger(
            "wse.interpreter.commands.wait",
            {
                interpreter: interpreter,
                command: command
            }, 
            false
        );

        self = interpreter;
        duration = command.getAttribute("duration");

        if (duration !== null)
        {
            duration = parseInt(duration, 10);
            interpreter.waitForTimer = true;
            
            setTimeout(
                function ()
                {
                    self.waitForTimer = false;
                }, 
                duration
            );
            
            return {
                doNext: true,
                wait: false
            };
        }

        return {
            doNext: true,
            wait: true
        };
    };    
}(WSE));