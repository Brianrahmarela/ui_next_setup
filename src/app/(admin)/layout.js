import React from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";
// import Loading from "@/components/dashboard/loading";
// import { API } from "@/config";
// import { cookies } from "next/headers";
// import RefreshToken from "@/config/refreshToken";

// const getProfile = async (token) => {
//   const response = await API.GET('/me', token);
//   return response;
// };

// export default function Layout({ children }) {
const Layout = async ({ children }) => {
	// const token = cookies().get('access_token')?.value;
	// const dataMe = await getProfile(token);

	// if (dataMe.meta.code === 401 || dataMe.meta.code === 403 ) {
	//   return <RefreshToken />;
	// }

	return (
		<div className="flex flex-row min-h-screen border-collapse">
			<div className={cn("block")}>
				<Header />
			</div>
			<div className={cn("hidden md:block")}>
				<Sidebar />
			</div>
			{/* <Suspense fallback={<Loading />}> */}
			<main className="flex-1 p-10 overflow-auto max-h-screen w-full pt-24">
			{/* <main className="flex-1 p-10 overflow-auto max-h-screen w-full mt-[90px]"> */}
				{children}
			</main>
			{/* </Suspense> */}
		</div>
	);
};

export default Layout;
