import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
 
interface ArticleView {
  title: string;
  url: string;
  views:number;
}
 
@Controller()
export class AppController {
 
  adatok: ArticleView[] = [
  {
    "title": "Bulbasaur",
    "url": "https://en.wikipedia.org/wiki/Bulbasaur",
    "views": 65535
  },
  {
    "title": "Polandball",
    "url": "https://en.wikipedia.org/wiki/Polandball",
    "views": 1504
  },
  {
    "title": "Ludwig van Beethoven",
    "url": "https://en.wikipedia.org/wiki/Ludwig_van_Beethoven",
    "views": 889
  },
  {
    "title": "Arch Linux",
    "url": "https://en.wikipedia.org/wiki/Arch_Linux",
    "views": 2
  },
  {
    "title": "BMSZC Petrik Lajos Két Tanítási Nyelvű Technikum",
    "url": "https://hu.wikipedia.org/wiki/BMSZC_Petrik_Lajos_K%C3%A9t_Tan%C3%ADt%C3%A1si_Nyelv%C5%B1_Technikum",
    "views": 1480
  },
  {
    "title": "Pokémonok listája",
    "url": "https://hu.wikipedia.org/wiki/Pok%C3%A9monok_list%C3%A1ja",
    "views": 1024
  },
  {
    "title": "Pluto (törpebolygó)",
    "url": "https://hu.wikipedia.org/wiki/Pluto_(t%C3%B6rpebolyg%C3%B3)",
    "views": 59
  },
  {
    "title": "99 Luftballons",
    "url": "https://de.wikipedia.org/wiki/99_Luftballons",
    "views": 14876
  },
  {
    "title": "Pizza",
    "url": "https://it.wikipedia.org/wiki/Pizza",
    "views": 248
  },
  {
    "title": "フシギダネ",
    "url": "https://ja.wikipedia.org/wiki/%E3%83%95%E3%82%B7%E3%82%AE%E3%83%80%E3%83%8D",
    "views": 28937
  }
]
 
  constructor(private readonly appService: AppService) {
   
  }
 
  // @Get()
  // @Render('index')
  // getHello() {
  //   return {
  //     title: 'My First NestJS App'
  //   }
  // }
 
 
  @Get()
  @Render('index')
  FooldalForm() {
 
    const rendezettAdatok= [...this.adatok]
 
    rendezettAdatok.sort((a,b)=>
    a.title.localeCompare(b.title));
 
    return {
      ArticleView: rendezettAdatok
    }
  }

  @Get('filter')
  @Render('filter')
  filterOldal(@Query('minViews') minViews?: string){
    let minimum =  Number(minViews);
    if(minViews === undefined || isNaN(minimum)){
      minimum = 0;
    }

    const szurtAdatok = this.adatok.filter(article => article.views >= minimum)
      .sort((a,b) => b.views - a.views);

    return{
      ArticleView: szurtAdatok,
      minViews: minimum
    };

  }
 
}
 