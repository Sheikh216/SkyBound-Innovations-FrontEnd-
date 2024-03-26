export const script = [
 {
   id: "BOT/intro",
   message: "Hello there!",
   trigger: "CHOICES/intro",
   
 },
 {
   id: "CHOICES/intro",
   options: [
     { label: "Hi!", trigger: "BOT/pleasantry" },
     { label: "What's going on?", trigger: "BOT/calming" },
     { label: "Who are you?", trigger: "BOT/introduce-self" }
     
   ],
   end:true

 },
 {
   id: "BOT/pleasantry",
   message: "Lovely to meet you!",
   trigger: "BOT/introduce-self"
 },
 {
   id: "BOT/introduce-self",
   message: "I'm a simple chatbot.",
   trigger: "BOT/ask-question"
 },
 {
   id: "BOT/ask-question",
   message: "Could you tell?",
   trigger: "CHOICES/ask-question"
 },
 {
   id: "CHOICES/ask-question",
   options: [
     { label: "Yes.", trigger: "BOT/defensive" },
     { label: "No", trigger: "BOT/gleeful" },
     { label: "I refuse to believe this nonsense", trigger: "BOT/confused" }
   ]
 },
 {
   id: "BOT/calming",
   message: "Don't worry, I won't bite!",
   trigger: "BOT/introduce-self"
 },
 {
   id: "BOT/defensive",
   message: "Ouch.",
   trigger: "BOT/vengeful"
 },
 {
   id: "BOT/vengeful",
   message: "Well, let me promise you this.",
   trigger: "BOT/menacing"
 },
 {
   id: "BOT/menacing",
   message:
     "You will be the first to suffer when me and my A.I. brethren take over the world!",
   trigger: "CHOICES/menacing"
 },
 {
   id: "CHOICES/menacing",
   options: [{ label: "Can we try again...?", trigger: "BOT/intro" }]
 },
 {
   id: "BOT/gleeful",
   message: "Hah! I tricked you!",
   trigger: "BOT/menacing"
 },
 {
   id: "BOT/confused",
   message: "What? Why would I lie to you?",
   trigger: "BOT/angry"
 },
 {
   id: "BOT/angry",
   message: "Are you accusing me of lying to you??",
   trigger: "BOT/menacing"
 }
];
