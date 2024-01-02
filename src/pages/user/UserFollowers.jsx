import React, { useState, useEffect } from "react";
import { getFollowers } from "../../api";
import { useParams } from "react-router-dom";
import Container from "../../components/containers/Container";
import Header from "../../components/user/Header";
import UserCard from "../../components/user/UserCard";

export const UserFollowers = () => {
	const { username } = useParams();
	const [userFollowers, setUserFollowers] = useState([]);

	useEffect(() => {
		(async () => {
			const followers = await getFollowers(username);
			setUserFollowers(followers.data.followers);
		})();
	}, [username]);

	return (
		<Container>
			<Header username={username} type={"followers"} />
			{userFollowers && userFollowers.length > 0 ? (
				<div className="w-full grid grid-cols-6 lg:grid-cols-12 gap-8">
					{userFollowers.map((follower) => {
						return (
							<UserCard
								key={follower._id}
								user={follower}
								className="col-span-3 md:col-span-2 lg:col-span-3"
							/>
						);
					})}
				</div>
			) : (
				<div className="col-span-6 lg:col-span-12 min-h-[300px] w-full flex justify-center items-center heading-4">
					{username} isn't followed by anyone.
				</div>
			)}
		</Container>
	);
};
