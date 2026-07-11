const storyData = {
    // ==========================================
    // CHAPTER 1: THE INITIAL CRITICAL DECISION
    // ==========================================
    "start": {
        type: "story",
        title: "Chapter 1: School Day",
        text: "You arrive at school feeling energized! Today is Safety Day, and your friends are chatting eagerly in the hallway.",
        imagePath: "assets/images/school_hallway.png",
        nextId: "morning_clouds"
    },
    "morning_clouds": {
        type: "story",
        title: "Chapter 1: School Day",
        text: "Suddenly, you glance out the classroom window. Dark, heavy storm clouds are sweeping quickly across the sky, blotting out the morning sun.",
        imagePath: "assets/images/dark_clouds.png",
        nextId: "teacher_warning"
    },
    "teacher_warning": {
        type: "choice", 
        title: "Chapter 1: School Day",
        text: "Your teacher steps up to the whiteboard: 'A severe flash flood warning has just been issued for our town. What should we do right now?'",
        imagePath: "assets/images/classroom.png",
        choices: [
            {
                text: "Stop, focus, and listen carefully to the safety instructions.",
                nextId: "listen_lesson",
                scoreModifier: 10,
                feedback: "Excellent! Paying close attention to emergency alerts keeps you and your classmates safe."
            },
            {
                text: "Ignore the warning and keep joking around at the back desks.",
                nextId: "alternative_disaster_branch", // 👈 Route 1: The Distraction Path
                scoreModifier: -20,
                feedback: "Oh no! Being distracted during a flash flood alert means you won't know the evacuation plan."
            },
            {
                text: "Pack your things and run out of the school building immediately by yourself.",
                nextId: "alternative_panic_branch", // 👈 FIXED STORY DISCONNECT: Diverts to a tailored panic script!
                scoreModifier: -15,
                feedback: "🚨 SAFETY LESSON: Panic running without a coordinator can isolate you directly in dangerous zones. Always follow the structural school plan!"
            }
        ]
    },
    "listen_lesson": {
        type: "story",
        title: "Chapter 1: Safety Lesson",
        text: "The teacher smiles. 'Great job. Now class, let's practice our skills by packing a classroom emergency kit bag before dismissal.'",
        imagePath: "assets/images/supply_table.png",
        nextId: "backpack_game"
    },
    "backpack_game": {
        type: "minigame", 
        title: "Chapter 1: Safety Lesson",
        text: "Click exactly THREE items from the table that would be appropriate and helpful for an emergency kit during a storm.",
        imagePath: "assets/images/backpack_screen.png"
    },
    "school_dismissal_scene": {
        type: "story",
        title: "Chapter 1: School Dismissal",
        text: "The rain begins to pound heavily against the school roof. Over the loudspeaker, the Principal announces: 'Classes are suspended due to worsening weather. Please proceed safely to your parents.'",
        imagePath: "assets/images/school_dismissal.png",
        nextId: "home_arrival"
    },
    "home_arrival": {
        type: "story",
        title: "Chapter 1: Heading Home",
        text: "You step outside where your parents are waiting. Thanks to leaving early, you navigate through the wet streets and make it back home safely just as Chapter 2 begins.",
        imagePath: "assets/images/safe_home.png",
        nextId: "chapter2_family_meeting"
    },

    // ==========================================
    // CHAPTER 2: HOME PREPARATION
    // ==========================================
    "chapter2_family_meeting": {
        type: "choice",
        title: "Chapter 2: Family Meeting",
        text: "Inside, the wind howls loudly. Your parents call a family meeting: 'The storm is getting worse overnight. The yard could flood. What household safety chore should we take care of first?'",
        imagePath: "assets/images/family_meeting.png",
        choices: [
            {
                text: "⚡ Help unplug expensive electronics and safely charge emergency devices.",
                nextId: "home_prep_instruction",
                scoreModifier: 15,
                feedback: "Smart thinking! Charging power banks early and disconnecting appliances prevents damage from electrical surges."
            },
            {
                text: "📦 Go down to the basement alone to gather loose floor toys.",
                nextId: "basement_close_call",
                scoreModifier: -10,
                feedback: "🚨 SAFETY LESSON: During floods, water gathers at the lowest point of a building first. Never enter basements when water levels are climbing outside because you can become trapped instantly!"
            },
            {
                text: "💨 Prop open the patio window frames to feel the storm breeze.",
                nextId: "window_mistake_scene",
                scoreModifier: -10,
                feedback: "🚨 SAFETY LESSON: Windows must remain tightly sealed during heavy wind and torrential storms to prevent flying debris from smashing glass into living spaces!"
            }
        ]
    },
    "basement_close_call": {
        type: "story",
        title: "Chapter 2: Moving Upstairs",
        text: "You step down to check the basement, but notice water already bubbling up through the floor drains! Realizing the danger, you quickly turn around and rush back up to the main level.",
        imagePath: "assets/images/flooding_basement.png",
        nextId: "home_prep_instruction"
    },
    "window_mistake_scene": {
        type: "story",
        title: "Chapter 2: Windy Threat",
        text: "A fierce gust of wind slams the glass panels, spraying storm water directly into the room! Your parents quickly slide the frame shut, lock it tightly, and gather everyone safely in the central hallway.",
        imagePath: "assets/images/windy_window.png",
        nextId: "home_prep_instruction"
    },
    "home_prep_instruction": {
        type: "story",
        title: "Chapter 2: Home Safety",
        text: "Now that the rooms are secure, your parents grab an open storage bin. 'Let's stock our home emergency shelf with items to keep us safe if the neighborhood loses power.'",
        imagePath: "assets/images/home_prep.png",
        nextId: "home_kit_game"
    },
    "home_kit_game": {
        type: "minigame",
        title: "Chapter 2: Supply Challenge",
        text: "Select THREE items from the shelf that will help your family stay safe and informed if you lose electricity.",
        imagePath: "assets/images/home_shelf.png"
    },
    "chapter2_nightfall": {
        type: "story",
        title: "Chapter 2: Nightfall",
        text: "The sun sets, and darkness blankets the town. Outside, the rain continues to pour relentlessly. Your family remains gathered together, monitoring the weather updates.",
        imagePath: "assets/images/storm_night.png",
        nextId: "chapter3_power_outage"
    },

    // ==========================================
    // CHAPTER 3: DURING THE FLOOD
    // ==========================================
    "chapter3_power_outage": {
        type: "story",
        title: "Chapter 3: Midnight Surge",
        text: "ZAP! A loud flash of lightning hits a nearby transformer. Total darkness hits the house. The power cuts out completely, and you can hear water rushing outside.",
        imagePath: "assets/images/power_outage.png",
        nextId: "chapter3_kit_usage"
    },
    "chapter3_kit_usage": {
        type: "choice",
        title: "Chapter 3: Working in the Dark",
        text: "It is pitch black and hard to see anything. How should we light our way to check on the family safely?",
        imagePath: "assets/images/dark_room.png",
        choices: [
            {
                text: "🔦 Grab the emergency flashlight you packed earlier.",
                nextId: "chapter3_radio_alert",
                scoreModifier: 15,
                requiredItem: "flashlight", 
                feedback: "Perfect! Flashlights are completely safe, portable, and give great lighting during a blackout."
            },
            {
                text: "🕯️ Light up a wax candle and use the matches from the drawer.",
                nextId: "chapter3_candle_warning",
                scoreModifier: -5,
                feedback: "🚨 SAFETY LESSON: Open flames from candles are highly discouraged during blackouts. Knocking one over accidentally can cause severe secondary home fires when emergency crews are unable to reach your street."
            },
            {
                text: "📱 Keep your phone screen at max brightness to find your way.",
                nextId: "chapter3_radio_alert",
                scoreModifier: 5,
                feedback: "It provides light, but using your main communication terminal as a flashlight runs down your backup battery quickly during an emergency!"
            }
        ]
    },
    "chapter3_candle_warning": {
        type: "story",
        title: "Chapter 3: Swapping the Light",
        text: "Seeing the open flame, your dad carefully blows out the candle. 'Let's use our battery-operated lights instead to make sure we don't start an accidental fire in the dark.'",
        imagePath: "assets/images/flashlight_use.png",
        nextId: "chapter3_radio_alert"
    },
    "chapter3_radio_alert": {
        type: "story",
        title: "Chapter 3: The Alarm",
        text: "Suddenly, an emergency weather broadcast crackles to life: 'Attention residents: Low-lying streets are flooding rapidly. Move to higher ground or prepare for evacuation immediately.'",
        imagePath: "assets/images/emergency_radio_alert.png",
        nextId: "chapter3_evac_choice"
    },
    "chapter3_evac_choice": {
        type: "choice",
        title: "Chapter 3: High Ground",
        text: "The floodwaters are beginning to rise up the driveway. Your parents grab the car keys as an evacuation order is issued. What is our plan?",
        imagePath: "assets/images/evac_map.png",
        choices: [
            {
                text: "🤝 Help your younger sibling wrap up warm and stay close to your parents.",
                nextId: "evacuation_center_scene",
                scoreModifier: 20,
                feedback: "Beautiful job! Helping family members and staying together ensures everyone evacuates safely."
            },
            {
                text: "🔌 Run back to plug your gaming console in to save your game progress.",
                nextId: "electrical_hazard_scene",
                scoreModifier: -20,
                actionFlag: "evac_mistake",
                feedback: "🚨 SAFETY LESSON: Floodwater can conduct raw grid current if your house circuits encounter moisture. Touching connected appliances or outlets during active floods risks major electrocution shocks!"
            },
            {
                text: "🛶 Grab a plastic floating raft to step outside into the rushing road current.",
                nextId: "electrical_hazard_scene",
                scoreModifier: -25,
                actionFlag: "evac_mistake",
                feedback: "🚨 SAFETY LESSON: Rushing floodwater has immense physical force. Trying to swim or float down open roads can sweep an individual under hidden drains instantly!"
            }
        ]
    },
    "electrical_hazard_scene": {
        type: "story",
        title: "Chapter 3: Moving Out",
        text: "Your parents quickly pull your hand back from the danger zone. 'We need to leave right now!' Staying together, your family exits the house immediately and safely navigates toward higher terrain.",
        imagePath: "assets/images/outlet_danger.png",
        nextId: "evacuation_center_scene"
    },
    "evacuation_center_scene": {
        type: "choice",
        title: "Chapter 3: Evacuation Center",
        text: "You arrive safely at the hilltop community center shelter! Inside, you spot your classmate, Leo. He looks cold and worried: 'My family had to leave so fast, we forgot to pack our emergency kit!' How can you help him?",
        imagePath: "assets/images/evac_center.png",
        choices: [
            {
                text: "🤝 Share a spare flashlight and some clean water from your packed kit.",
                nextId: "chapter4_return_home",
                scoreModifier: 20,
                actionFlag: "helped_leo",
                feedback: "Wonderful job! Because you prepared a great kit earlier, you had enough to help a friend in need. That is true community spirit!"
            },
            {
                text: "🎮 Sit alone by the wall to focus on playing offline phone games.",
                nextId: "chapter4_return_home",
                scoreModifier: -20,
                actionFlag: "ignored_leo",
                feedback: "Oh no! Emergencies are times to stick together. Sharing simple resources like water or a light makes a massive difference for someone who is scared."
            },
            {
                text: "🥪 Walk with Leo to alert a shelter coordinator that his family needs supplies.",
                nextId: "chapter4_return_home",
                scoreModifier: 15,
                actionFlag: "helped_leo",
                feedback: "Excellent! Informing staff ensures that displaced families get aligned with real blankets, food, and dry clothes right away."
            }
        ]
    },

    // ==========================================
    // CHAPTER 4: AFTER THE FLOOD
    // ==========================================
    "chapter4_return_home": {
        type: "story",
        title: "Chapter 4: Returning Home",
        text: "The next morning, the sun breaks through the clouds! The radio announces that floodwaters have receded and authorities declare it safe to return home. Your family goes back to check the property.",
        imagePath: "assets/images/return_home.png",
        nextId: "hazard_instruction"
    },
    "hazard_instruction": {
        type: "story",
        title: "Chapter 4: Hazard Inspection",
        text: "Your parents stop you at the doorway: 'The house is dry, but floodwaters leave dangerous hidden items behind. Let's inspect the the pathway carefully first.'",
        imagePath: "assets/images/inspect_house.png",
        nextId: "hazard_game"
    },
    "hazard_game": {
        type: "minigame",
        title: "Chapter 4: Spot the Hazard",
        text: "Spot and select exactly THREE dangerous hazards in the room that must be removed or avoided for safety. Be careful where you click!",
        imagePath: "assets/images/hazard_screen.png"
    },
    "hazard_failure_scene": {
        type: "choice",
        title: "❌ INSPECTION FAILED: Dangerous Conditions",
        text: "You stepped blindly onto hazardous areas 5 times without identifying the threats properly. Your parents make everyone step back outside to reassess.",
        imagePath: "assets/images/failed_inspection.png",
        choices: [
            {
                text: "Re-try Inspection (Keep Progress)",
                nextId: "hazard_instruction", 
                scoreModifier: 0,
                feedback: "Let's approach this carefully. Take your time to locate only the items that look damaged or out of place."
            }
        ]
    },
    "back_to_school_scene": {
        type: "choice",
        title: "Chapter 4: Back to School",
        text: "A few days later, schools reopen! Everyone gathers in a circle to share what they learned during the flood event.",
        imagePath: "assets/images/school_circle.png",
        choices: [] 
    },
    "victory_ending": {
        type: "choice",
        title: "🏆 GAME COMPLETE: Safety Champion!",
        text: "Evaluating your final safety marks...", 
        imagePath: "assets/images/grand_victory.png",
        choices: [
            {
                text: "Replay Campaign (Try a Different Path)",
                nextId: "start",
                scoreModifier: 0,
                feedback: "Let's run through it again to lock down our safety instincts!"
            }
        ]
    },
    "bad_reflection_ending": {
        type: "choice",
        title: "🛑 CRISIS SUMMARY: Hard Lessons Learned",
        text: "Because you isolated yourself, ignored safety procedures, and packed items purely for entertainment, you were unable to contribute anything useful to your peers. Real emergencies require active attention and social cooperation.",
        imagePath: "assets/images/sad_classroom.png",
        choices: [
            {
                text: "Replay Campaign (Strive to Protect Your Community)",
                nextId: "start",
                scoreModifier: 0,
                feedback: "Now you understand the weight of emergency choices. Let's do it right this time!"
            }
        ]
    },

    // ==========================================
    // ALTERNATIVE PATHS: FLASH FLOOD FAILURE BRIDGES
    // ==========================================
    "alternative_disaster_branch": {
        type: "story",
        title: "Chapter 1: Sudden Emergency",
        text: "While you are busy talking and joking around, you completely miss the official safety announcement. Minutes later, a rushing torrent of water floods the school hallway! The power instantly cuts out.",
        imagePath: "assets/images/flooded_hallway.png",
        nextId: "trapped_scene"
    },
    "alternative_panic_branch": {
        type: "story",
        title: "Chapter 1: Caught in the Storm",
        text: "Panicking, you sprint blindly out of the classroom doors and into the main school courtyard. But outside, streets are already filled with rushing flash currents! Trapped by water levels, you are forced back into a dark classroom corridor.",
        imagePath: "assets/images/flooded_hallway.png", // Re-uses asset cleanly
        nextId: "trapped_scene"
    },
    "trapped_scene": {
        type: "story",
        title: "Chapter 1: Caught in the Flood",
        text: "You don't have an emergency kit, you don't have a flashlight, and the water is rising up to your knees. You and your friends are stranded on top of a classroom desk, shivering in the dark, waiting for emergency rescue boats.",
        imagePath: "assets/images/stranded_classroom.png",
        nextId: "bad_ending_summary"
    },
    "bad_ending_summary": {
        type: "choice",
        title: "⚠️ GAME OVER: Unprepared",
        text: "Flash floods happen incredibly fast. By ignoring instructions or running blindly, you were caught completely off guard without supplies or a plan.",
        imagePath: "assets/images/rescue_boat.png",
        choices: [
            {
                text: "🔄 Try Again (Choose Safety!)",
                nextId: "start",
                scoreModifier: 0,
                feedback: "That's the spirit! Let's hit the reset button and practice being a true safety champion."
            }
        ]
    }
};