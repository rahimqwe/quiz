import React from "react";

const quotes = [
	{
		name: "Sarah, 34, freelance developer",
		text: "Avoided invoicing for 3 weeks. Used the protocol—first email open in four minutes. Not ‘planned.’ Started.",
	},
	{
		name: "Marcus, 41, startup founder",
		text: "Every system became another job. This is four steps on nine pages. Used it for a tough client call and taxes—moving in five minutes.",
	},
	{
		name: "Jen, 29, content creator",
		text: "The AI prompt alone is worth it. Paste vague task → get exact first action. Six uses this week.",
	},
];

const SocialProof: React.FC = () => {
	return (
		<div className="space-y-4">
			{quotes.map((q, idx) => (
				<div
					key={idx}
					className="p-5 rounded-xl bg-card border border-border flex items-start gap-3"
				>
					{/* Avatar slot */}
					<div
						className="h-10 w-10 rounded-full bg-muted flex-shrink-0"
						role="img"
					/>
					<div>
						<p className="text-base leading-relaxed italic text-foreground mb-1">
							“{q.text}”
						</p>
						<p className="text-xs font-medium text-muted-foreground">
							{q.name}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default SocialProof;
