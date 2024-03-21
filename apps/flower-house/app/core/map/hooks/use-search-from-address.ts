import type { GeocodeAddress } from "@/app/core/map/libs/get-geocode";
import { geocodeAddress } from "@/app/core/map/libs/get-geocode";
import { useEffect, useState } from "react";

//주소를 통해 좌표를 찾아주는 훅
export function useSearchFromAddress() {
  const [searchedAddress, setSearchedAddress] = useState<string>("");
  const [geocodeResult, setGeocodeResult] = useState<GeocodeAddress | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);

  const updateAddress = async (newAddress: string) => {
    // 주소가 비어 있는지 확인합니다.
    if (newAddress.trim() === "") {
      // 비어 있다면 오류를 throw합니다.
      throw new Error("Address cannot be empty");
    }
    if (newAddress === searchedAddress) return;

    // 주소가 비어 있지 않다면 setAddress를 호출하여 업데이트합니다.
    setSearchedAddress(newAddress);
  };

  useEffect(() => {
    if (!searchedAddress) {
      setGeocodeResult(null);
      setError(null);
      return;
    }

    geocodeAddress(searchedAddress)
      .then((result) => {
        setGeocodeResult(result);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setGeocodeResult(null);
      });
  }, [searchedAddress]);

  return { geocodeResult, error, updateAddress, searchedAddress };
}
