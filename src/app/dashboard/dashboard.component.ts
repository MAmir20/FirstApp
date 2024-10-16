import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MemberService } from './../../services/member.service';
import { EvenementService } from './../../services/evenement.service';
// import { ToolService } from './../../services/tool.service';
// import { ArticleService } from './../../services/article.service';
import { ChartDataset, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  nb_members:number = 0;
  nb_events:number = 0;
  nb_tools:number = 0;
  nb_articles:number = 0;
  nb_students:number = 0;
  nb_teachers:number = 0;

  // Injection des services
  constructor(private MS: MemberService, private ES: EvenementService) {
    this.MS.getAllMembers().subscribe((response)=>{
      this.nb_members= response.length;
      for (let i = 0; i < this.nb_members; i++) {
        if(response[i].type == "student"){
          this.nb_students++;
        }
        else{
          this.nb_teachers++;
        }
        this.chartData = [
          {
            // ⤵️ Add these
            label: '$ in millions',
            data: [ this.nb_teachers, this.nb_students ],
          }
        ];
      }
    });
  }

  chartData: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: '$ in millions',
      data: [],
    }
  ];
  chartLabels: string[] = ['nbTeachers', 'nbStudents'];
  chartOptions: ChartOptions = {};
}
