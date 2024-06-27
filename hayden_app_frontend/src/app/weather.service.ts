import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum Day {
  YESTERDAY = 0,
  TODAY = 1
};

export type WeatherObject = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    is_day: string;
    rain: string;
    showers: string;
    snowfall: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
    wind_gusts_10m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    rain: number;
    showers: number;
    snowfall: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    weather_code: number;
  };
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    sunrise: string;
    sunset: string;
    uv_index_max: string;
    uv_index_clear_sky_max: string;
    precipitation_sum: string;
    wind_speed_10m_max: string;
    wind_gusts_10m_max: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    uv_index_clear_sky_max: number[];
    weather_code: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    wind_direction_10m_dominant: number[]
  };
};

type Location = {
  name: string,
  latitude: number,
  longitude: number,
  country: string,
  state: string
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
 private city_state!: string;
 private weather_data_subject = new BehaviorSubject<WeatherObject | null>(null);
 private weather_data$ = this.weather_data_subject.asObservable();

  constructor(private http: HttpClient) { }

  search_city(city_query: string): void {
    this.city_state = city_query;
    
    let [city, state_or_country] = this.clean_location_string(city_query);

    const headers = new HttpHeaders().set("X-Api-Key", "zSYVKpJURdCT4e7f4r8beA==gSnnunfC6TnY1yjJ");
    this.http.get<Location[]>(`https://api.api-ninjas.com/v1/geocoding?city=${city_query}`, { headers })
      .pipe(map(response => {
        
        let desired_location: Location | null = null;
        let matches: number = 0;

        response.forEach((location: Location) => {
          let match = 0;
          if (city === location.name) ++match;
          if (state_or_country === location.state || state_or_country === location.country) ++match;

          if (match > matches) {
            desired_location = location;
            matches = match;
            this.city_state = `${desired_location.name}, ${desired_location.state}`
          }
        });

        if (!desired_location) {
          console.log("Bad city query. Use format `city, state` or `city, country`");
          throw new Error("Bad city query. Use format `city, state` or `city, country`");
        } else {
          return desired_location;
        }
      }))
      .subscribe({
        next: (data: Location) => this.get_weather_data(data.longitude, data.latitude),
        error: error => console.error(error)
    });
  }

  clean_location_string(city_state: string): [string, string] {
    let city: string;
    let state: string;

    if (city_state.includes(',')) [city, state] = city_state.split(',').slice(0, 2);
    else [city, state] = [city_state, ''];
    
    city = city.trim();
    state = state.trim();

    return [city, state];
  }

  get_weather_data(longitude: number, latitude: number) {
    const url = "https://api.open-meteo.com/v1/forecast";
    const params = {
      latitude: latitude,
      longitude: longitude,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,showers,snowfall,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day,weather_code',
      daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,weather_code,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max',
      temperature_unit: 'fahrenheit',
      wind_speed_unit: 'mph',
      precipitation_unit: 'inch',
      timezone: 'America/Chicago'
    };

    this.http.get<WeatherObject>(url, { params })
      .subscribe({
        next: data => this.weather_data_subject.next(data),
        error: error => console.error(error)
      });
  }

  // FIXME: 
  get_city_state() {
    return this.weather_data$.pipe(
      map(city_state => {
        return this.city_state;
      })
    )
  }

  get_weather_code() {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return -1;
        else return data.current.weather_code;
      })
    )
  }

  get_weather_codes() {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return [];
        else return data.daily.weather_code.slice(Day.TODAY);
      })
    )
  }

  get_precipitation_probabilities() {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return [];
        else return data.daily.precipitation_probability_max;
      })
    )
  }

  get_wind_speed(day: Day): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else if (day == Day.TODAY) return data.current.wind_speed_10m;
        else return data.daily.wind_speed_10m_max[day];
      })
    );
  }

  get_wind_gust_speed(): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else return data.current.wind_gusts_10m;
      })
    )
  }

  get_wind_direction(): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else return data.current.wind_direction_10m;
      })
    );
  }

  get_temperature(): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else return Math.round(data.current.temperature_2m);
      })
    );
  }

  get_humidity(): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else return data.current.relative_humidity_2m;
      })
    );
  }

  get_uv_index(day: Day): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else return Number(data.daily.uv_index_max[day].toFixed(1));
      })
    );
  }

  get_temperature_high(day: Day): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else return Math.round(data.daily.temperature_2m_max[day]);
      })
    );
  }

  get_temperature_low(day: Day): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else return Math.round(data.daily.temperature_2m_min[day]);
      })
    );
  }

  get_temperature_forecast(): Observable<number[]> {
    const expected_length = 7;
    const hi_weight = 0.75;
    const lo_weight = 1 - hi_weight;

    const max_rand_temp = 84;
    const min_rand_temp = max_rand_temp - 20;
    return this.weather_data$.pipe(
      map(data => {
        if (!data) {
          return Array.from({ length: expected_length }, (_, i) => {
            return Math.floor(Math.random() * (max_rand_temp - min_rand_temp + 1)) + min_rand_temp;
          })
        } else {
          return data.daily.temperature_2m_max.map((max, i) => {
            return max * hi_weight + data.daily.temperature_2m_min[i] * lo_weight;
          });
        }
      })
    )
  }

  get_image(mode: string, days: string): Observable<string[]> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return [];

        let weather_codes: number[];
        if (days === 'forecast') weather_codes = data.daily.weather_code.slice(Day.TODAY);
        else weather_codes = [data.current.weather_code];

        return weather_codes.map(code => {
          let icon_number: number;
          let image_url: string;
          let night: boolean = data.current.is_day === 0;
          let cold: boolean = data.current.temperature_2m <= 35;

          if (code === 0 || code === 1) {
            // Clear Skies
            icon_number = 1;
            if (night && cold) image_url = pick_random(clear_skies_night_cold);
            else if (night && !cold) image_url = pick_random(clear_skies_night_hot);
            else if (!night && cold) image_url = pick_random(clear_skies_day_cold);
            else image_url = pick_random(clear_skies_day_hot);

          } else if (code >= 3 && code <= 9 || code == 12 || code >= 14 && code <= 16 || code === 18 || code === 20 || code === 21 || code === 25) {
            // CLoudy
            icon_number = 3;
            if (night && cold) image_url = pick_random(cloudy_skies_night_cold);
            else if (night && !cold) image_url = pick_random(cloudy_skies_night_hot);
            else if (!night && cold) image_url = pick_random(cloudy_skies_day_cold);
            else image_url = pick_random(cloudy_skies_day_hot);

          } else if (code === 10 || code === 11 || code === 27 || code >= 40 && code <= 49) {
            // Haze
            icon_number = 50;
            image_url = pick_random(fog)

          } else if (code === 13 || code === 17 || code === 18 || code === 29 || code >= 95 && code <= 99) {
            // Thunderstorm
            icon_number = 11;
            if (night) image_url = pick_random(thunderstorm_night);
            else image_url = pick_random(thunderstorm_day);

          } else if (code >= 22 && code <= 24 || code === 26 || code === 56 || code === 57 || code === 66 || code === 67 || code >= 70 && code <= 79 || code >= 83 && code <= 88 || code === 93 || code === 94) {
            // snow
            icon_number = 13;
            if (night) image_url = pick_random(snow_night);
            else image_url = pick_random(snow_day);

          } else if (code >= 20 && code <= 21 || code === 25 || code === 27 || code >= 50 && code <= 55 || code >= 58 && code <= 59 || code >= 60 && code <= 65 || code >= 68 && code >= 69 || code >= 80 && code <= 82 || code >= 89 && code <= 92) {
            // rain
            console.log("rain");
            icon_number = 9;
            if (night) image_url = pick_random(rain_night);
            else image_url = pick_random(rain_day);

          } else {
            // default to clear skies
            icon_number = 1;
            image_url = pick_random(clear_skies_day_hot);

          }

          if (mode === 'icon') return `https://openweathermap.org/img/wn/${icon_number}${night ? 'n' : 'd'}@2x.png`
          else return `url(${image_url})`;
        })
      })
    );
  }
}

function pick_random(array: any[]): any {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

const clear_skies_day_hot: string[] = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.suwalls.com%2Fwallpapers%2Fnature%2Fbright-sun-in-the-clear-sky-above-the-mountain-lake-53554-1920x1200.jpg&f=1&nofb=1&ipt=fe695cac1acfb620b691a2fbd131edd41c78884b2e30b1cf4252962a42572156&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F5c%2F00%2F44%2F5c0044b2b5d57f1a0e63280c2a4db10e.jpg&f=1&nofb=1&ipt=676e3df5f3b3cc3c55c5deffc277fab08f3217e3356aef9c484442a60d612115&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F1131293.jpg&f=1&nofb=1&ipt=afce873acbc0f9ff1a4ce8cab88b0f61f35334095cca03bdff58ff7110ad90e5&ipo=images"
];

const clear_skies_night_hot: string[] = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallpapertip.com%2Fwmimgs%2F109-1099721_clear-stars-sky-night-rock-4k-clear-sky.jpg&f=1&nofb=1&ipt=0bd9d680f88c8734ddc5068527748066a73014a645cd7c8881e05aedc60617d1&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpicfiles.alphacoders.com%2F218%2F218258.jpg&f=1&nofb=1&ipt=d3f7b4e059619cfa161776c4ef77f9e0c4545e8b2af8eca6cc4fa4ba79fe0fdd&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pixel4k.com%2Fwp-content%2Fuploads%2F2018%2F10%2Fminimal-night-pink-aurora-long-exposure-5k_1540142970.jpg&f=1&nofb=1&ipt=3a97a6e19eb6ef161879a3769cd68cbfdb085cb88cb86fc07bb4a849be359e16&ipo=images"
]

const clear_skies_day_cold: string[] = [
  "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fdata.1freewallpapers.com%2Fdownload%2Fsnowy-mountains-in-the-sunlight.jpg&f=1&nofb=1&ipt=4ddd4f4bcd6831f04259c015f9e945bb23209ab77a6a0619c229c422217a174a&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhdqwalls.com%2Fdownload%2F1%2Fsnow-twilight-clear-sky-ct.jpg&f=1&nofb=1&ipt=71de67d97bd2bca74f1f3dc1e7c8ca0cf1e3a5b075209332dfa209affe9eccb2&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Flandscape-tree-nature-mountain-snow-cold-winter-cloud-sky-hill-mountain-range-daytime-ice-glacier-arctic-ridge-summit-winter-landscape-massif-alps-fell-cirque-piste-elevation-tundra-nunatak-freezing-mountain-pass-mountainous-landforms-glacial-landform-geological-phenomenon-ice-cap-mount-scenery-1377242.jpg&f=1&nofb=1&ipt=41fdf538450c55b024cd94053f38a7d1d61c1e1f775fe39d2c112df37c565bab&ipo=images"
]

const clear_skies_night_cold: string[] = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F435550.jpg&f=1&nofb=1&ipt=d24f8a8a0499249e446108925c480490768ea2364e73b04c0d515ddce6e85bf5&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2015%2F12%2F298156-nature-landscape-snow-Milky_Way-lake-starry_night-water-reflection-forest-fall-trees-Finland-long_exposure.jpg&f=1&nofb=1&ipt=94d790d1e8802331535be29f1da519fb26fae1dba4864193738b4c072d99a057&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs2.best-wallpaper.net%2Fwallpaper%2F1920x1200%2F1605%2FWinter-snow-lake-sky-clouds-sunset-glow-mountain_1920x1200.jpg&f=1&nofb=1&ipt=e201d1513253b2cfbef1dce3c4f8b899516dc2d41ffb22f8d0f118af2848b61c&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2016%2F01%2F198562-nature-landscape-snow-trees-forest.jpg&f=1&nofb=1&ipt=8f4feb7123337c564074bec7d0f8efa0e28ec096b3d1b7f9486a4e9c769a92e9&ipo=images"
]

const cloudy_skies_day_hot: string[] = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fsky-cloud-nature-natural-landscape-daytime-cumulus-atmospheric-phenomenon-sunlight-morning-hill-highland-atmosphere-grass-ecoregion-grassland-horizon-landscape-tree-plain-rural-area-meteorological-phenomenon-evening-mountain-prairie-photography-meadow-plant-fell-sunset-wind-1496717.jpg&f=1&nofb=1&ipt=c784f2898712a7610ab9ad8204f064ce117b19b61dc7ab462a480e93f6e11628&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1541119638723-c51cbe2262aa%3Fcrop%3Dentropy%26cs%3Dtinysrgb%26fit%3Dmax%26fm%3Djpg%26ixid%3DMnwxMjA3fDB8MXxzZWFyY2h8MXx8ZGF5JTIwc2t5fHwwfHx8fDE2Mjc4MTk5NTU%26ixlib%3Drb-1.2.1%26q%3D80%26w%3D1080&f=1&nofb=1&ipt=8d5de74f6deb7919a637d58966cd4260b26b43a62815b0b3a40391db5304e9ab&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.hoodline.com%2Fuploads%2Fstory%2Fimage%2F423867%2Funsplash__..featured_image_4..cloudy_3.jpg.jpg&f=1&nofb=1&ipt=cdcaaa0f54cc9dc7590e397c7543c681bab0716dfb180bdca1118d81c9c9fb85&ipo=images"
];

const cloudy_skies_night_hot: string[] = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F3397234.jpg&f=1&nofb=1&ipt=64350cec41d8557c81380adb436cdff3dd859d3a0d4e3da4e868e5f8e5f2a0e4&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pixel4k.com%2Fwp-content%2Fuploads%2F2018%2F09%2Fsky-clouds-night-city-4k_1538068453.jpg&f=1&nofb=1&ipt=1ad84c1f3a87e221f7dfff5763d3f8b0563f18713ae7ffd6cf2e433f335adb41&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pixelstalk.net%2Fwp-content%2Fuploads%2F2016%2F03%2FNight-Cloud-Wallpaper-free-download.jpg&f=1&nofb=1&ipt=5a58c46a7a1909c123fe4de3bc0f8f907475b167f5e6e4e6108e3e4720f177b1&ipo=images"
];

const cloudy_skies_day_cold: string[] = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hdwallpapers.in%2Fdownload%2Fcarpathian_mountains_with_trees_covered_with_snow_and_sunlight_with_cloudy_sky_during_winter_hd_nature-HD.jpg&f=1&nofb=1&ipt=4ad57c2db2da273a56e022d665fd537c5409bebf2efb32238d6a721b6222faad&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercrafter.com%2Fdesktop%2F246168-cloudy-overhead-skies-hovering-over-snowy-mountain.jpg&f=1&nofb=1&ipt=abf2d89f3cbc299b5062628f402a579959f1d80881d161f179688bab0c9bbc16&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Flandscape-nature-mountain-snow-winter-cloud-sky-view-mountain-range-panorama-weather-cumulus-snowy-alpine-leisure-ridge-summit-austria-clouds-mountains-alps-vision-outlook-plateau-wide-winter-dream-wintry-winter-magic-winter-sports-distant-view-landform-alpine-panorama-meteorological-phenomenon-geographical-feature-mountainous-landforms-geological-phenomenon-981069.jpg&f=1&nofb=1&ipt=e95cda5c641558d4fd43609c4058515de868bf8a4bf402badac6b97542191183&ipo=images"
];

const cloudy_skies_night_cold: string[] = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercrafter.com%2Fdesktop%2F251505-dark-storm-clouds-roll-in-over-snowy-mountains-in-.jpg&f=1&nofb=1&ipt=725246fa647e7a4d6f7ae027809020b7a690b9c882790440331335bf5fe639fa&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercrafter.com%2Fdesktop%2F205719-a-dark-cloudy-overcast-on-snow-covered-mountain-to.jpg&f=1&nofb=1&ipt=f2532c30f054d7c8a26f350b82dc84f508622bf4b6591a231edc19c254acea5f&ipo=images",
];

const thunderstorm_day: string[] = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.hdqwalls.com%2Fdownload%2Fthunderstorm-lightning-bolt-striking-down-at-sunset-in-nebraska-4k-u1-2560x1600.jpg&f=1&nofb=1&ipt=cd5d41115a2dbeda1ab9dab4ca21abd6dea6bd3418d6ba013e7147d34957f241&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgetwallpapers.com%2Fwallpaper%2Ffull%2F3%2Fe%2F7%2F887048-vertical-thunderstorm-wallpaper-2560x1600-4k.jpg&f=1&nofb=1&ipt=2fbdadcdb4ca86235f6169d232ad50b4c69e9265e2f9245428ba726aca55c34c&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.wallhere.com%2Fphoto%2Fsunlight-landscape-sky-lightning-storm-evening-wind-horizon-atmosphere-Arizona-thunder-Monsoon-cloud-tree-day-mountain-thunderstorm-highland-meteorological-phenomenon-cumulus-phenomenon-stormchasing-arizonathunderstorms-whetstone-azwmonsoon2013-883401.jpg&f=1&nofb=1&ipt=a14800550900eb8e73602d3b260de1d3657b2aa14bbc32140339d437e3f19197&ipo=images"
];

const thunderstorm_night: string[] = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2016%2F01%2F157032-tornado-thunder-lightning-storm-nature.jpg&f=1&nofb=1&ipt=961fc768acf206cd349d95e028a0823dcc80d4fd388c1fd47f2008fbf6acc078&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fuotoh0J.jpg&f=1&nofb=1&ipt=5be8930202a26a891ab16801da850eef4d601375cecd94cb8360fa896fcda689&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhartzellprop.com%2Fwp-content%2Fuploads%2FGettyImages-940296124-scaled.jpg&f=1&nofb=1&ipt=5681e6c6ab21f2c55234591fcafd0eed8d46096c8bcc5bc2431e10590b542589&ipo=images"
];

const snow_day: string[] = [
  "https://i.pinimg.com/564x/76/c5/20/76c520e1c79f34b36e4ed6a054b2ea8e.jpg",
  "https://media.istockphoto.com/id/863513024/photo/winter-scene-snowfall-on-the-blurred-background.webp?b=1&s=170667a&w=0&k=20&c=DAvnxqOtBtezR707fH_6AdeV-qo_JyajXt27bVgKyp0=",
  "https://images.ctfassets.net/hrltx12pl8hq/5thrWp3Se4mcffFgMORIds/9013edc6afcdfe220a7334eb49d81b9d/snow-images.jpg?fit=fill&w=1200&h=630" 
];

const snow_night: string[] = [
  "https://cdn.wallpapersafari.com/2/22/WlHRU0.jpg",
  "https://mcdn.wallpapersafari.com/medium/1/89/XQFskS.jpg",
  "https://mcdn.wallpapersafari.com/medium/91/7/DG30Xx.jpg",
];

const rain_day: string[] = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2019%2F05%2F10%2F838643-storm-weather-rain-sky-clouds-nature-sea-ocean-landscape.jpg&f=1&nofb=1&ipt=ddbceaeb9e80f1634f9acac7d37f9856949e5ccd5c1c7e0ca6d94525e45c3ec2&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Flandscape-nature-cloud-sky-rain-atmosphere-weather-storm-clouds-thunderstorm-atmospheric-phenomenon-1328727.jpg&f=1&nofb=1&ipt=115f56bc12ea35d97dd38f85841b3961cac9aa25bdd1b8ee1de2679e34052691&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp5249586.jpg&f=1&nofb=1&ipt=a73649d738aaae24cb77309f817aa1bfc4b4d1b0df0186c512ea1ed4ef64d4c1&ipo=images"
];

const rain_night: string[] = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp5249606.jpg&f=1&nofb=1&ipt=e14c67964d1da34dded690900bf0d54fcc8e330bbd3cf0d03a187f973e74aa7d&ipo=images",
];

const fog: string[] = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallpapertip.com%2Fwmimgs%2F219-2190972_foggy-forest-wallpaper.jpg&f=1&nofb=1&ipt=f584c96bbadf256d9d51bcabf7cf9c452e598e19843655766fb292cc36b24407&ipo=images"
]