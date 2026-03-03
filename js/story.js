/**
 * MathQuest Stories
 *
 * Multiple anime stories, one per topic.
 * Each correct answer unlocks the next page of that topic's story.
 */

const Stories = (() => {

    // ========================================================
    //  STORY 1: "The Fraction Blade" (Multiply Fractions)
    // ========================================================

    const fractionBlade = {
        id: 'fraction_blade',
        title: 'The Fraction Blade',
        topic: 'multiply_fractions',
        totalPages: 20,
        pages: [
            {
                chapter: 1,
                title: "The Mysterious Scroll",
                art: `<div class="story-scene scene-night">
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
                art: `<div class="story-scene scene-portal">
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
                art: `<div class="story-scene scene-kingdom">
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
                art: `<div class="story-scene scene-forest">
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
                art: `<div class="story-scene scene-training">
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
                art: `<div class="story-scene scene-bridge">
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
                art: `<div class="story-scene scene-enchanted">
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
                art: `<div class="story-scene scene-clearing">
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
                art: `<div class="story-scene scene-river">
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
                art: `<div class="story-scene scene-village">
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
                art: `<div class="story-scene scene-confrontation">
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
                art: `<div class="story-scene scene-duel">
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
                art: `<div class="story-scene scene-redemption">
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
                art: `<div class="story-scene scene-fortress">
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
                art: `<div class="story-scene scene-tower">
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
                art: `<div class="story-scene scene-blade">
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
                art: `<div class="story-scene scene-boss">
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
                art: `<div class="story-scene scene-final-battle">
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
                art: `<div class="story-scene scene-victory">
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
                art: `<div class="story-scene scene-ending">
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
        ]
    };

    // ========================================================
    //  STORY 2: "The Shadow Mirror" (Divide Fractions)
    // ========================================================

    const shadowMirror = {
        id: 'shadow_mirror',
        title: 'The Shadow Mirror',
        topic: 'divide_fractions',
        totalPages: 15,
        pages: [
            {
                chapter: 1,
                title: "The Forgotten Shrine",
                art: `<div class="story-scene scene-night">
                    <div class="scene-bg stars"></div>
                    <div class="scene-object scroll glow"></div>
                    <div class="scene-fireflies f1"></div>
                    <div class="scene-fireflies f2"></div>
                </div>`,
                text: `Kai stumbled upon an ancient shrine hidden deep in the woods behind his school. Overgrown with vines and covered in dust, it held only one thing: a tall mirror with a frame carved from obsidian, covered in fraction symbols that pulsed with a faint silver glow.`,
                mood: 'mysterious'
            },
            {
                chapter: 2,
                title: "The Reflection Speaks",
                art: `<div class="story-scene scene-clearing">
                    <div class="scene-bg moonlight"></div>
                    <div class="scene-moon"></div>
                    <div class="scene-effect portal-ring"></div>
                </div>`,
                text: `As Kai touched the glass, his reflection moved on its own. "Help us," it whispered. "The Mirror King has trapped our world. He's stealing all knowledge of division from both sides. Soon, no one will remember how to divide -- not here, not in your world either." The glass rippled like water.`,
                mood: 'mysterious'
            },
            {
                chapter: 3,
                title: "Through the Glass",
                art: `<div class="story-scene scene-portal">
                    <div class="scene-bg swirl"></div>
                    <div class="scene-effect portal-ring"></div>
                    <div class="scene-effect portal-ring ring2"></div>
                    <div class="scene-cherry-blossom p1"></div>
                </div>`,
                text: `Kai pressed his hand against the mirror, and it swallowed him whole. He tumbled through a tunnel of silver light, fractions spinning around him like snowflakes. When he landed, everything was reversed -- the sky was below, the ground was above, and the trees grew downward. Welcome to the Mirror World.`,
                mood: 'exciting'
            },
            {
                chapter: 4,
                title: "Hoshi the Light Spirit",
                art: `<div class="story-scene scene-enchanted">
                    <div class="scene-bg magic-forest"></div>
                    <div class="scene-spirit-fox glowing"></div>
                    <div class="scene-fireflies f1"></div>
                    <div class="scene-fireflies f2"></div>
                    <div class="scene-fireflies f3"></div>
                </div>`,
                text: `A tiny orb of golden light floated toward Kai. "I'm Hoshi!" she chimed, her glow brightening. "I used to be the spirit guardian of this world, but the Mirror King drained my power. I'm barely a spark now. But if you can solve division problems, each answer gives me a little strength back!"`,
                mood: 'magical'
            },
            {
                chapter: 5,
                title: "The Rule of Flipping",
                art: `<div class="story-scene scene-training">
                    <div class="scene-bg dojo"></div>
                    <div class="scene-math-aura"></div>
                    <div class="scene-fraction-orbs"></div>
                    <div class="scene-spirit-fox"></div>
                </div>`,
                text: `"Division in this world is special," Hoshi explained, growing a little brighter with each problem Kai solved. "To divide fractions, you flip the second fraction upside down and then multiply! It's called the reciprocal." Glowing fraction orbs appeared, and Kai practiced flipping and multiplying until it felt natural.`,
                mood: 'training'
            },
            {
                chapter: 6,
                title: "The Fractured Bridge",
                art: `<div class="story-scene scene-bridge">
                    <div class="scene-bg ravine"></div>
                    <div class="scene-bridge-structure"></div>
                    <div class="scene-effect sparkles"></div>
                </div>`,
                text: `Their path was blocked by a bridge shattered into uneven pieces. Each piece was a fraction, and to fit them back together, Kai had to divide the larger pieces into smaller, equal parts. "Think about what division really means," Hoshi encouraged. "You're splitting things into equal groups!" Piece by piece, the bridge reformed.`,
                mood: 'adventure'
            },
            {
                chapter: 7,
                title: "The Glass Lake",
                art: `<div class="story-scene scene-river">
                    <div class="scene-bg water"></div>
                    <div class="scene-moon"></div>
                    <div class="scene-fireflies f1"></div>
                    <div class="scene-fireflies f2"></div>
                </div>`,
                text: `They reached a lake made entirely of glass, perfectly still and reflecting the upside-down sky. Beneath the surface, fraction equations shimmered. "The lake shows you the reciprocal of everything," Hoshi said. "Look -- 2/3 becomes 3/2 in the reflection. That's how division works!" Kai watched in amazement as the math came alive.`,
                mood: 'wonder'
            },
            {
                chapter: 8,
                title: "The Shadow Scouts",
                art: `<div class="story-scene scene-confrontation">
                    <div class="scene-bg storm"></div>
                    <div class="scene-character rival"></div>
                    <div class="scene-lightning"></div>
                    <div class="scene-dark-energy"></div>
                </div>`,
                text: `Dark figures emerged from the shadows -- the Mirror King's scouts. "No one divides in this kingdom!" they hissed. They attacked with equations designed to confuse, but Kai stood firm. For each problem they threw at him, he flipped and multiplied, turning their dark energy into bursts of light. The scouts fled in disbelief.`,
                mood: 'tense'
            },
            {
                chapter: 9,
                title: "The Upside-Down Village",
                art: `<div class="story-scene scene-village">
                    <div class="scene-bg mountains"></div>
                    <div class="scene-houses"></div>
                    <div class="scene-villagers"></div>
                    <div class="scene-cherry-blossom p1"></div>
                </div>`,
                text: `In a village hanging from the ceiling of a massive cavern, the people had forgotten how to share equally. "We can't divide our food or our land," the elder said sadly. "The Mirror King took that knowledge from us." Kai taught them -- dividing by a fraction means multiplying by its flip. Slowly, smiles returned to their faces.`,
                mood: 'heartwarming'
            },
            {
                chapter: 10,
                title: "Hoshi Remembers",
                art: `<div class="story-scene scene-clearing">
                    <div class="scene-bg moonlight"></div>
                    <div class="scene-spirit-fox glowing"></div>
                    <div class="scene-moon"></div>
                    <div class="scene-cherry-blossom p1"></div>
                    <div class="scene-cherry-blossom p2"></div>
                </div>`,
                text: `That night, Hoshi's glow was stronger than ever. "I'm remembering now," she whispered. "Before the Mirror King came, I was a great fox spirit. He shattered my power into fractions and scattered them across the mirror world. Every problem you solve puts me back together." Her form flickered -- for a moment, Kai saw a magnificent silver fox.`,
                mood: 'emotional'
            },
            {
                chapter: 11,
                title: "The Mirror King's Castle",
                art: `<div class="story-scene scene-fortress">
                    <div class="scene-bg dark-castle"></div>
                    <div class="scene-dark-energy"></div>
                    <div class="scene-effect dark-swirl"></div>
                    <div class="scene-effect dark-swirl s2"></div>
                </div>`,
                text: `The Mirror King's castle floated upside down above a sea of broken reflections. Its walls were made of twisted mirrors that showed wrong answers and scrambled equations. "He wants everyone to be confused," Hoshi said. "But division brings clarity. It breaks things into parts you can understand. That's your power, Kai."`,
                mood: 'ominous'
            },
            {
                chapter: 12,
                title: "The Hall of Mirrors",
                art: `<div class="story-scene scene-tower">
                    <div class="scene-bg spiral-stairs"></div>
                    <div class="scene-effect portal-ring"></div>
                    <div class="scene-effect portal-ring ring2"></div>
                    <div class="scene-effect glow-trail"></div>
                </div>`,
                text: `Inside the castle, every room was a puzzle of mirrors and fractions. Divide to open doors. Divide to deactivate traps. Divide mixed numbers to unlock secret passages. Kai moved through each challenge with growing confidence. What once seemed impossible now felt like a superpower. Hoshi blazed brighter with every step.`,
                mood: 'determined'
            },
            {
                chapter: 13,
                title: "The Mirror King",
                art: `<div class="story-scene scene-boss">
                    <div class="scene-bg void"></div>
                    <div class="scene-boss-shadow"></div>
                    <div class="scene-effect dark-swirl"></div>
                    <div class="scene-effect math-beams"></div>
                    <div class="scene-effect math-beams b2"></div>
                </div>`,
                text: `"YOU DARE DIVIDE IN MY KINGDOM?!" The Mirror King was a towering figure made of cracked glass, his body reflecting a thousand distorted images. He hurled impossible-looking problems at Kai -- mixed numbers, whole numbers divided by fractions, complex expressions. But Kai didn't flinch. Flip and multiply. Simplify. Repeat.`,
                mood: 'epic'
            },
            {
                chapter: 14,
                title: "Shattered",
                art: `<div class="story-scene scene-final-battle">
                    <div class="scene-bg cosmic"></div>
                    <div class="scene-effect math-beams"></div>
                    <div class="scene-effect math-beams b2"></div>
                    <div class="scene-effect math-beams b3"></div>
                    <div class="scene-spirit-fox full-power"></div>
                </div>`,
                text: `With one final answer, the Mirror King's glass body cracked from top to bottom. Hoshi erupted into her true form -- a radiant silver fox, ten feet tall, blazing with mathematical light. "IMPOSSIBLE!" the King screamed as he shattered into a thousand harmless reflections. The upside-down world slowly began to turn right-side up.`,
                mood: 'climax'
            },
            {
                chapter: 15,
                title: "Two Worlds, One Mirror",
                art: `<div class="story-scene scene-victory">
                    <div class="scene-bg golden-sky"></div>
                    <div class="scene-spirit-fox full-power"></div>
                    <div class="scene-cherry-blossom p1"></div>
                    <div class="scene-cherry-blossom p2"></div>
                    <div class="scene-cherry-blossom p3"></div>
                    <div class="scene-cherry-blossom p4"></div>
                    <div class="scene-effect sparkles ending"></div>
                </div>`,
                text: `The mirror world healed. The sky returned to the top, the trees grew upward, and the glass lake reflected the truth again. Hoshi nuzzled Kai's hand. "The mirror in your shrine will always connect our worlds now. Keep practicing division -- every problem you solve keeps both worlds strong." Kai stepped back through the glass, smiling, knowing he'd return.`,
                mood: 'triumphant'
            }
        ]
    };

    // ========================================================
    //  STORY 3: "The Crystal Garden" (Bonus)
    // ========================================================

    const crystalGarden = {
        id: 'crystal_garden',
        title: 'The Crystal Garden',
        topic: 'bonus',
        totalPages: 10,
        pages: [
            {
                chapter: 1,
                title: "The Seed of Numbers",
                art: `<div class="story-scene scene-night">
                    <div class="scene-bg stars"></div>
                    <div class="scene-cherry-blossom p1"></div>
                    <div class="scene-cherry-blossom p2"></div>
                    <div class="scene-fireflies f1"></div>
                    <div class="scene-fireflies f2"></div>
                </div>`,
                text: `Hana found a tiny crystal seed glowing in her backyard after a thunderstorm. It hummed with a soft melody, and when she held it up to the moonlight, she could see fractions swirling inside it like a snow globe. "Plant me," whispered a voice from within the seed, "and I will grow into something wonderful."`,
                mood: 'mysterious'
            },
            {
                chapter: 2,
                title: "The Garden Awakens",
                art: `<div class="story-scene scene-kingdom">
                    <div class="scene-bg gradient-sky"></div>
                    <div class="scene-cherry-blossom p1"></div>
                    <div class="scene-cherry-blossom p2"></div>
                    <div class="scene-cherry-blossom p3"></div>
                    <div class="scene-cherry-blossom p4"></div>
                    <div class="scene-fireflies f1"></div>
                </div>`,
                text: `Overnight, the seed erupted into a garden that shouldn't have been possible. Crystal flowers in every color bloomed from silver stems. Fraction equations floated like butterflies between the petals. At the center stood a tree made entirely of light, its branches forming the most beautiful math equations Hana had ever seen.`,
                mood: 'wonder'
            },
            {
                chapter: 3,
                title: "Sakura the Guardian",
                art: `<div class="story-scene scene-enchanted">
                    <div class="scene-bg magic-forest"></div>
                    <div class="scene-spirit-fox glowing"></div>
                    <div class="scene-fireflies f1"></div>
                    <div class="scene-fireflies f2"></div>
                    <div class="scene-fireflies f3"></div>
                </div>`,
                text: `A pink fox with crystal fur stepped out from behind the light tree. "I am Sakura, guardian of the Crystal Garden. This garden grows from the power of math -- every fraction you solve makes a new flower bloom. But be warned: a great storm is coming, and only a strong garden can survive it."`,
                mood: 'magical'
            },
            {
                chapter: 4,
                title: "Petal Puzzles",
                art: `<div class="story-scene scene-training">
                    <div class="scene-bg dojo"></div>
                    <div class="scene-math-aura"></div>
                    <div class="scene-fraction-orbs"></div>
                </div>`,
                text: `Sakura taught Hana to tend the garden with math. "Each crystal flower needs the right fraction to bloom. Multiply to grow them taller, divide to split them into new buds." Hana solved problem after problem, and with each answer, a new crystal flower burst into brilliant color. The garden hummed with energy.`,
                mood: 'training'
            },
            {
                chapter: 5,
                title: "Storm Clouds",
                art: `<div class="story-scene scene-confrontation">
                    <div class="scene-bg storm"></div>
                    <div class="scene-lightning"></div>
                    <div class="scene-dark-energy"></div>
                </div>`,
                text: `Dark clouds rolled in, crackling with anti-math energy. The storm was alive -- a swirling mass of confusion that erased equations and wilted flowers. "It feeds on doubt," Sakura warned. "Every time someone thinks 'I can't do math,' the storm grows stronger. We have to grow the garden faster than the storm can destroy it!"`,
                mood: 'tense'
            },
            {
                chapter: 6,
                title: "Roots of Knowledge",
                art: `<div class="story-scene scene-bridge">
                    <div class="scene-bg ravine"></div>
                    <div class="scene-bridge-structure"></div>
                    <div class="scene-effect sparkles"></div>
                    <div class="scene-effect glow-trail"></div>
                </div>`,
                text: `Hana discovered that the crystal flowers had roots that connected underground, forming a network of math. When she solved harder problems -- mixed numbers, complex fractions -- the roots grew deeper and stronger, anchoring the garden against the storm. "The deeper you understand," Sakura said, "the harder you are to uproot."`,
                mood: 'determined'
            },
            {
                chapter: 7,
                title: "The Great Wilting",
                art: `<div class="story-scene scene-boss">
                    <div class="scene-bg void"></div>
                    <div class="scene-boss-shadow"></div>
                    <div class="scene-effect dark-swirl"></div>
                    <div class="scene-effect dark-swirl s2"></div>
                </div>`,
                text: `The storm hit with full force. Crystal flowers shattered, equations scattered, and the light tree dimmed. Sakura's fur lost its glow. "Don't give up!" she cried. "Every problem you've solved is still inside you. The garden can regrow as long as you keep trying!" Hana stood firm in the howling wind, fractions blazing in her mind.`,
                mood: 'epic'
            },
            {
                chapter: 8,
                title: "Seeds of Hope",
                art: `<div class="story-scene scene-duel">
                    <div class="scene-bg arena"></div>
                    <div class="scene-energy-clash"></div>
                    <div class="scene-effect math-beams"></div>
                    <div class="scene-effect math-beams b2"></div>
                </div>`,
                text: `Hana began solving problems faster than ever. Each answer was a seed of light that she threw into the storm. Multiply! A crystal rose bloomed in the darkness. Divide! A silver lily cut through the clouds. The storm roared, but Hana's garden grew right through it, flowers of pure mathematical light pushing back the darkness.`,
                mood: 'climax'
            },
            {
                chapter: 9,
                title: "Full Bloom",
                art: `<div class="story-scene scene-victory">
                    <div class="scene-bg golden-sky"></div>
                    <div class="scene-spirit-fox full-power"></div>
                    <div class="scene-cherry-blossom p1"></div>
                    <div class="scene-cherry-blossom p2"></div>
                    <div class="scene-cherry-blossom p3"></div>
                    <div class="scene-effect sparkles ending"></div>
                </div>`,
                text: `With one final burst of math, the storm dissolved into a shower of crystal petals. The garden was more beautiful than ever -- twice as large, twice as bright. The light tree blazed like a sun, and Sakura transformed into a magnificent crystal fox that sparkled with every color imaginable. "You grew this garden with your own knowledge, Hana. It's yours forever."`,
                mood: 'triumphant'
            },
            {
                chapter: 10,
                title: "The Eternal Garden",
                art: `<div class="story-scene scene-ending">
                    <div class="scene-bg sunrise"></div>
                    <div class="scene-cherry-blossom p1"></div>
                    <div class="scene-cherry-blossom p2"></div>
                    <div class="scene-cherry-blossom p3"></div>
                    <div class="scene-cherry-blossom p4"></div>
                    <div class="scene-effect sparkles ending"></div>
                </div>`,
                text: `The Crystal Garden became a permanent part of Hana's world -- a secret place where math and magic intertwined. Every day she visited, solving new problems and growing new flowers. And sometimes, late at night, she'd see other kids from school wandering in, drawn by the garden's glow. "Everyone can grow a garden like this," Sakura whispered. "All they need to do is try."`,
                mood: 'bittersweet'
            }
        ]
    };

    // ========================================================
    //  Registry & API
    // ========================================================

    const allStories = {
        fraction_blade: fractionBlade,
        shadow_mirror: shadowMirror,
        crystal_garden: crystalGarden
    };

    // Which story goes with which topic
    const topicStoryMap = {
        multiply_fractions: 'fraction_blade',
        divide_fractions: 'shadow_mirror'
    };

    function getStory(storyId) {
        return allStories[storyId] || null;
    }

    function getPage(storyId, index) {
        const story = allStories[storyId];
        if (!story || index < 0 || index >= story.pages.length) return null;
        return story.pages[index];
    }

    function getTotalPages(storyId) {
        const story = allStories[storyId];
        return story ? story.totalPages : 0;
    }

    function getStoryIdForTopic(topic) {
        return topicStoryMap[topic] || null;
    }

    function getAllStories() {
        return Object.values(allStories);
    }

    function getMainStories() {
        return [fractionBlade, shadowMirror];
    }

    function getBonusStories() {
        return [crystalGarden];
    }

    return {
        getStory,
        getPage,
        getTotalPages,
        getStoryIdForTopic,
        getAllStories,
        getMainStories,
        getBonusStories
    };
})();
