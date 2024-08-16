<script lang="ts">
import {defineComponent} from 'vue'

interface locationData {
  lat: number,
  lng: number,
  x: number,
  y: number
}

export default defineComponent({
  data() {
    return {
      latitude: -1, //위도
      longitude: -1,  //경도
      x: 62,
      y: 123
    }
  },
  created() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude; //위치정보 받기(위도)
      this.longitude = position.coords.longitude; //위치정보 받기(경도)

      //위도, 경도를 격자점으로 변환 후 값 반환.
      const locationData: locationData = this.locationConverter("toXY", this.latitude, this.longitude);
      console.log(locationData);
      this.x = locationData.x;
      this.y = locationData.y;
    });

  },
  methods: {
    //code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y)
    locationConverter(code: string, v1: number, v2: number): locationData {
      const RE = 6371.00877; // 지구 반경(km)
      const GRID = 5.0; // 격자 간격(km)
      const SLAT1 = 30.0; // 투영 위도1(degree)
      const SLAT2 = 60.0; // 투영 위도2(degree)
      const OLON = 126.0; // 기준점 경도(degree)
      const OLAT = 38.0; // 기준점 위도(degree)
      const XO = 43; // 기준점 X좌표(GRID)
      const YO = 136; // 기1준점 Y좌표(GRID)

      var DEGRAD = Math.PI / 180.0;
      var RADDEG = 180.0 / Math.PI;

      var re = RE / GRID;
      var slat1 = SLAT1 * DEGRAD;
      var slat2 = SLAT2 * DEGRAD;
      var olon = OLON * DEGRAD;
      var olat = OLAT * DEGRAD;

      var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
      sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
      var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
      sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
      var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
      ro = re * sf / Math.pow(ro, sn);
      var rs = {};
      if (code == "toXY") {
        rs['lat'] = v1;
        rs['lng'] = v2;
        var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
        ra = re * sf / Math.pow(ra, sn);
        var theta = v2 * DEGRAD - olon;
        if (theta > Math.PI) theta -= 2.0 * Math.PI;
        if (theta < -Math.PI) theta += 2.0 * Math.PI;
        theta *= sn;
        rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
        rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
      }
      else {
        rs['x'] = v1;
        rs['y'] = v2;
        var xn = v1 - XO;
        var yn = ro - v2 + YO;
        ra = Math.sqrt(xn * xn + yn * yn);
        if (sn < 0.0) - ra;
        var alat = Math.pow((re * sf / ra), (1.0 / sn));
        alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

        if (Math.abs(xn) <= 0.0) {
          theta = 0.0;
        }
        else {
          if (Math.abs(yn) <= 0.0) {
            theta = Math.PI * 0.5;
            if (xn < 0.0) - theta;
          }
          else theta = Math.atan2(xn, yn);
        }
        var alon = theta / sn + olon;
        rs['lat'] = alat * RADDEG;
        rs['lng'] = alon * RADDEG;
      }
      return rs;
    }
  }

})
</script>

<template>

</template>

<style scoped>

</style>