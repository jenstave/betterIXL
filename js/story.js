/**
 * MathQuest Story - "The Fraction Blade"
 *
 * A 20-page anime story that unlocks one page at a time
 * as the player answers questions correctly.
 */

const Story = (() => {
    const TOTAL_PAGES = 20;

    const pages = [
        {
            chapter: 1,
            title: "The Mysterious Scroll",
            art: `
                <div class="story-scene scene-night">
                    <div class="scene-bg stars"></div>
                    <div class="scene-character kira"></div>
                    <div class="scene-object scroll glow"></div>
                </div>`,
            text: `Kira was walking home from school when a glowing scroll fell from the sky and landed at her feet. Strange symbols -- fractions -- shimmered across its surface. As she picked it up, the numbers rearranged themselves into words: "The Fraction Kingdom needs you."`,
            mood: 'mysterious'
        },
        {
            chapter: 2,
            title: "The Portal Opens",
            art: `
                <div class="story-scene scene-portal">
                    <div class="scene-bg swirl"></div>
                    <div class="scene-character kira surprised"></div>
                    <div class="scene-effect portal-ring"></div>
                    <div class="scene-effect portal-ring ring2"></div>
                </div>`,
            text: `The scroll burst into light. A swirling purple portal opened in the air, crackling with mathematical energy. Fractions and equations spiraled around its edges like a cosmic whirlpool. Kira took a deep breath and stepped through.`,
            mood: 'exciting'
        },
        {
            chapter: 3,
            title: "The Fraction Kingdom",
            art: `
                <div class="story-scene scene-kingdom">
                    <div class="scene-bg gradient-sky"></div>
                    <div class="scene-castle"></div>
                    <div class="scene-character kira amazed"></div>
                    <div class="scene-cherry-blossom p1"></div>
                    <div class="scene-cherry-blossom p2"></div>
                    <div class="scene-cherry-blossom p3"></div>
                </div>`,
            text: `On the other side, a breathtaking world unfolded before her. Crystal towers rose into a pink-purple sky, and cherry blossoms drifted through the air. Numbers floated like fireflies everywhere. This was the Fraction Kingdom -- a world where math was magic.`,
            mood: 'wonder'
        },
        {
            chapter: 4,
            title: "Sensei Taro",
            art: `
                <div class="story-scene scene-forest">
                    <div class="scene-bg trees"></div>
                    <div class="scene-character sensei"></div>
                    <div class="scene-character kira"></div>
                    <div class="scene-object staff glow"></div>
                </div>`,
            text: `A wise old fox wearing round glasses appeared from behind a crystal tree. "I am Sensei Taro," he said with a bow. "We've been waiting for you, Kira. The Shadow has stolen the Fraction Blade, and without it, our kingdom is falling apart. Only someone who masters fractions can wield it."`,
            mood: 'serious'
        },
        {
            chapter: 5,
            title: "The First Lesson",
            art: `
                <div class="story-scene scene-training">
                    <div class="scene-bg dojo"></div>
                    <div class="scene-character kira determined"></div>
                    <div class="scene-math-aura"></div>
                    <div class="scene-fraction-orbs"></div>
                </div>`,
            text: `"To multiply fractions," Sensei Taro explained, "you multiply the tops together and the bottoms together. Simple -- but powerful." Glowing fraction orbs appeared around Kira. As she solved each one, they transformed into bursts of energy. She could feel herself getting stronger.`,
            mood: 'training'
        },
        {
            chapter: 6,
            title: "The Crystal Bridge",
            art: `
                <div class="story-scene scene-bridge">
                    <div class="scene-bg ravine"></div>
                    <div class="scene-bridge-structure"></div>
                    <div class="scene-character kira"></div>
                    <div class="scene-effect sparkles"></div>
                </div>`,
            text: `Their first challenge: a broken crystal bridge over a bottomless ravine. Each missing piece was a fraction puzzle. Kira multiplied and divided fractions to rebuild the bridge piece by piece, the crystals lighting up as each answer locked into place.`,
            mood: 'adventure'
        },
        {
            chapter: 7,
            title: "The Enchanted Forest",
            art: `
                <div class="story-scene scene-enchanted">
                    <div class="scene-bg magic-forest"></div>
                    <div class="scene-character kira walking"></div>
                    <div class="scene-spirit-fox"></div>
                    <div class="scene-fireflies f1"></div>
                    <div class="scene-fireflies f2"></div>
                    <div class="scene-fireflies f3"></div>
                </div>`,
            text: `Deep in the Enchanted Forest, the trees whispered equations. A small spirit fox with blue fur appeared, its tail leaving trails of light. "I'm Yuki," it said. "I'll guide you, but the forest tests everyone who enters. The trees only part for those who can divide."`,
            mood: 'magical'
        },
        {
            chapter: 8,
            title: "Yuki's Secret",
            art: `
                <div class="story-scene scene-clearing">
                    <div class="scene-bg moonlight"></div>
                    <div class="scene-character kira sitting"></div>
                    <div class="scene-spirit-fox glowing"></div>
                    <div class="scene-moon"></div>
                </div>`,
            text: `By a moonlit clearing, Yuki revealed her secret. "I was once the guardian of the Fraction Blade. The Shadow tricked me and stole it. I lost my full power that day." A tear of light rolled down her fur. "But you -- you're learning so fast. You might be the one to get it back."`,
            mood: 'emotional'
        },
        {
            chapter: 9,
            title: "The River of Numbers",
            art: `
                <div class="story-scene scene-river">
                    <div class="scene-bg water"></div>
                    <div class="scene-character kira boat"></div>
                    <div class="scene-spirit-fox small"></div>
                    <div class="scene-numbers floating"></div>
                </div>`,
            text: `They reached the Starlight River, where numbers flowed like water. To cross, Kira had to solve fraction problems that appeared as stepping stones. "Remember," called Yuki, "when you divide fractions, flip the second one and multiply!" Each correct answer made a stone glow beneath her feet.`,
            mood: 'adventure'
        },
        {
            chapter: 10,
            title: "The Mountain Village",
            art: `
                <div class="story-scene scene-village">
                    <div class="scene-bg mountains"></div>
                    <div class="scene-houses"></div>
                    <div class="scene-character kira"></div>
                    <div class="scene-villagers"></div>
                </div>`,
            text: `High in the mountains, they found a small village where the people had lost the ability to do math. "The Shadow's curse," explained the village elder. "Without math, we can't build, cook, or trade." Kira spent time teaching the children fraction multiplication, and slowly, the village began to come back to life.`,
            mood: 'heartwarming'
        },
        {
            chapter: 11,
            title: "The Rival Appears",
            art: `
                <div class="story-scene scene-confrontation">
                    <div class="scene-bg storm"></div>
                    <div class="scene-character kira battle-ready"></div>
                    <div class="scene-character rival"></div>
                    <div class="scene-lightning"></div>
                </div>`,
            text: `A figure in a dark cloak blocked their path. "I am Zero, apprentice of the Shadow," he sneered. "You think fractions can save this world? Math is pointless!" He hurled shadow bolts, but Kira countered each one with fraction calculations that formed a shimmering shield.`,
            mood: 'tense'
        },
        {
            chapter: 12,
            title: "The Math Duel",
            art: `
                <div class="story-scene scene-duel">
                    <div class="scene-bg arena"></div>
                    <div class="scene-character kira power-up"></div>
                    <div class="scene-character rival weakening"></div>
                    <div class="scene-energy-clash"></div>
                </div>`,
            text: `Zero challenged her to a math duel. Problem after problem flew between them like lightning. But while Zero relied on tricks, Kira truly understood the math. She simplified, multiplied, and divided with precision. "How?!" Zero gasped as his shadow energy crumbled. "Because I actually learned it," Kira said.`,
            mood: 'epic'
        },
        {
            chapter: 13,
            title: "Zero's Change of Heart",
            art: `
                <div class="story-scene scene-redemption">
                    <div class="scene-bg sunset"></div>
                    <div class="scene-character kira kind"></div>
                    <div class="scene-character rival-kneeling"></div>
                    <div class="scene-spirit-fox"></div>
                </div>`,
            text: `Defeated, Zero fell to his knees. "The Shadow promised me power if I stopped people from learning." Kira offered her hand. "It's not too late. Math isn't about power over others -- it's about understanding the world." Zero looked up, and for the first time, the darkness in his eyes faded.`,
            mood: 'redemption'
        },
        {
            chapter: 14,
            title: "The Shadow's Fortress",
            art: `
                <div class="story-scene scene-fortress">
                    <div class="scene-bg dark-castle"></div>
                    <div class="scene-character kira"></div>
                    <div class="scene-character zero-ally"></div>
                    <div class="scene-spirit-fox"></div>
                    <div class="scene-dark-energy"></div>
                </div>`,
            text: `Together, the three of them -- Kira, Yuki, and a reformed Zero -- reached the Shadow's fortress. It was a massive structure of twisted numbers and broken equations, hovering above a sea of darkness. "The Fraction Blade is at the top," Yuki whispered. "We have to solve our way up."`,
            mood: 'ominous'
        },
        {
            chapter: 15,
            title: "Climbing the Tower",
            art: `
                <div class="story-scene scene-tower">
                    <div class="scene-bg spiral-stairs"></div>
                    <div class="scene-character kira climbing"></div>
                    <div class="scene-puzzle-doors"></div>
                    <div class="scene-effect glow-trail"></div>
                </div>`,
            text: `Every floor of the tower had a locked door that could only be opened by solving fraction challenges. Multiplying fractions to unlock gates, dividing fractions to deactivate traps. Kira's skills had grown so much since that first day. What once seemed hard now felt like second nature.`,
            mood: 'determined'
        },
        {
            chapter: 16,
            title: "The Fraction Blade",
            art: `
                <div class="story-scene scene-blade">
                    <div class="scene-bg throne-room"></div>
                    <div class="scene-character kira reaching"></div>
                    <div class="scene-object blade glow pulse"></div>
                    <div class="scene-effect radiant"></div>
                </div>`,
            text: `At the top of the tower, floating in a beam of dark light, was the Fraction Blade. It was beautiful -- a crystal sword with fraction symbols etched along its edge, glowing with pure mathematical energy. As Kira reached for it, it responded to her touch, recognizing her knowledge.`,
            mood: 'awe'
        },
        {
            chapter: 17,
            title: "The Shadow Awakens",
            art: `
                <div class="story-scene scene-boss">
                    <div class="scene-bg void"></div>
                    <div class="scene-character kira blade-wielder"></div>
                    <div class="scene-boss-shadow"></div>
                    <div class="scene-effect dark-swirl"></div>
                    <div class="scene-effect dark-swirl s2"></div>
                </div>`,
            text: `"FOOLISH CHILD." The Shadow materialized -- a massive being of pure darkness with equations burning like cracks across its body. "Math is NOTHING. I will erase every number from existence!" It attacked with waves of chaotic energy. Kira raised the Fraction Blade and stood her ground.`,
            mood: 'epic'
        },
        {
            chapter: 18,
            title: "The Final Battle",
            art: `
                <div class="story-scene scene-final-battle">
                    <div class="scene-bg cosmic"></div>
                    <div class="scene-character kira ultimate"></div>
                    <div class="scene-boss-shadow cracking"></div>
                    <div class="scene-effect math-beams"></div>
                    <div class="scene-effect math-beams b2"></div>
                    <div class="scene-effect math-beams b3"></div>
                </div>`,
            text: `The battle raged across the sky. Every attack from the Shadow, Kira answered with the Fraction Blade. Multiply to strike, divide to defend. Yuki and Zero supported her from below, calling out encouragement. With one final swing, Kira solved the ultimate fraction -- and a beam of pure light shot through the Shadow's core.`,
            mood: 'climax'
        },
        {
            chapter: 19,
            title: "Light Returns",
            art: `
                <div class="story-scene scene-victory">
                    <div class="scene-bg golden-sky"></div>
                    <div class="scene-character kira victorious"></div>
                    <div class="scene-spirit-fox full-power"></div>
                    <div class="scene-character zero-smiling"></div>
                    <div class="scene-cherry-blossom p1"></div>
                    <div class="scene-cherry-blossom p2"></div>
                    <div class="scene-cherry-blossom p3"></div>
                    <div class="scene-cherry-blossom p4"></div>
                </div>`,
            text: `The Shadow shattered into a million fragments of light. Color flooded back into the Fraction Kingdom. The crystal towers gleamed, the cherry blossoms bloomed brighter than ever, and the numbers danced joyfully in the air. Yuki transformed back into her true form -- a majestic silver fox surrounded by starlight. "You did it, Kira."`,
            mood: 'triumphant'
        },
        {
            chapter: 20,
            title: "A Hero's Promise",
            art: `
                <div class="story-scene scene-ending">
                    <div class="scene-bg sunrise"></div>
                    <div class="scene-character kira waving"></div>
                    <div class="scene-portal-home"></div>
                    <div class="scene-all-friends"></div>
                    <div class="scene-cherry-blossom p1"></div>
                    <div class="scene-cherry-blossom p2"></div>
                    <div class="scene-effect sparkles ending"></div>
                </div>`,
            text: `Standing before the portal home, Kira looked back at her friends. "Will I see you again?" Sensei Taro smiled. "The Fraction Kingdom is always here for those who keep learning. Every problem you solve makes our world stronger." Kira stepped through the portal, scroll in hand, knowing this was only the beginning of her math adventures.`,
            mood: 'bittersweet'
        }
    ];

    function getPage(index) {
        if (index < 0 || index >= pages.length) return null;
        return pages[index];
    }

    function getTotalPages() {
        return TOTAL_PAGES;
    }

    return { getPage, getTotalPages };
})();
