import { vworldApiClient } from "@/utils/apiClient";

export const getClimbingInfoApiLocation = (params) => {
	const { lat, lng, buffer, page, size } = params;
	const geomFilter = `POINT(${lng} ${lat})`;

	return vworldApiClient
		.get("/req/data", {
			params: {
				service: "data",
				request: "GetFeature",
				format: "json",
				data: "LT_L_FRSTCLIMB",
				domain: "http://43.202.215.75:8080",
				geomFilter: geomFilter,
				buffer,
				page,
				size
			}
		})
		.then((res) => res.data);
};