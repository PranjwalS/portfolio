import React from "react";

const socialLinks: { [key: string]: string } = {
  linkedin: "https://linkedin.com/in/yourname",
  github: "https://github.com/yourname",
  instagram: "https://instagram.com/yourname",
  twitter: "https://twitter.com/yourname",
  medium: "https://medium.com/@yourname",
  devpost: "https://devpost.com/yourname",
  leetcode: "https://leetcode.com/yourname",
  discord: "https://discord.com/users/yourname",
  email: "mailto:your.name@uwaterloo.ca",
};

const SocialBox: React.FC = () => {
  const icons: { name: string; symbol: string }[] = [
    { name: "linkedin", symbol: "💼" },
    { name: "github", symbol: "🐙" },
    { name: "instagram", symbol: "📷" },
    { name: "twitter", symbol: "🐦" },
    { name: "medium", symbol: "✍️" },
    { name: "devpost", symbol: "🏆" },
    { name: "leetcode", symbol: "💻" },
    { name: "discord", symbol: "💬" },
    { name: "email", symbol: "📧" },
  ];

  return (
    <div className="bg-gradient-to-tr from-gray-800 to-gray-900 p-6 rounded-xl text-center">
      <h3 className="text-lg text-white mb-4">Find Me Online</h3>
      <div className="grid grid-cols-3 gap-3">
        {icons.map((icon) => (
          <div
            key={icon.name}
            className={`flex items-center justify-center aspect-square rounded-lg cursor-pointer text-xl hover:scale-105 hover:rotate-3 transition`}
            onClick={() => {
              if (icon.name === "email") window.location.href = socialLinks[icon.name];
              else window.open(socialLinks[icon.name], "_blank");
            }}
          >
            {icon.symbol}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialBox;
