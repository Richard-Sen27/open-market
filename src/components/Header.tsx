import React from "react";
import Profile from "./Profile";

export default function Header({ children }: { children: React.ReactElement }) {
	return (
		<div className="flex justify-between items-center">
			{children}
			<Profile />
		</div>
	)
}