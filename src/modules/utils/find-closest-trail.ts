
export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // 지구 반지름 (km)
    const φ1 = lat1 * Math.PI / 180; // 위도를 라디안으로 변환
    const φ2 = lat2 * Math.PI / 180; // 위도를 라디안으로 변환
    const Δφ = (lat2 - lat1) * Math.PI / 180; // 위도 차이를 라디안으로 변환
    const Δλ = (lon2 - lon1) * Math.PI / 180; // 경도 차이를 라디안으로 변환
  
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // 반환 값은 킬로미터 단위
  }