import {Component, OnInit} from '@angular/core';
import {OrcListItemModel} from '../../models/OrcListItemModel';
import {OrcService} from '../../services/orc.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orc-list',
  templateUrl: './orc-list.component.html',
  styleUrls: ['./orc-list.component.css']
})
export class OrcListComponent implements OnInit {
  orcs: OrcListItemModel[] = [];

  constructor(private orcService: OrcService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchOrcs();
  }

  fetchOrcs = () => {
    this.orcService.fetchOrcs().subscribe(
      (orcList: OrcListItemModel[]) => {
        this.orcs = orcList;
      },
      error => console.warn(error),
    );
  }

  deleteOrc(id: number): void {
    this.orcService.deleteOrc(id).subscribe(
      (response: OrcListItemModel[]) => {
        this.orcs = response;
        // this.router.navigate(['/orc-list/']);
        this.fetchOrcs();
      }, error => console.warn(error),
    );
  }

  editOrc = (id: number) => {
    this.router.navigate(['/orc-form/', id]);
  }

}
