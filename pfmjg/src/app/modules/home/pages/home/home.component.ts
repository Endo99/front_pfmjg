import { Component } from '@angular/core';

// icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import FlagCircleOutlinedIcon from '@mui/icons-material/FlagCircleOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  iconSize = '3vw';

  readonly listMenu = Object.values({0: 
                      { 
                        legenda : "Home",
                        icon: HomeOutlinedIcon,
                      },
                      1: {
                        legenda : "Desempenho",
                        icon: TimelineOutlinedIcon
                    },
                      2: {
                        legenda : "Relatório",
                        icon : InventoryOutlinedIcon
                      },
                      3: {
                        legenda : "Metas",
                        icon: FlagCircleOutlinedIcon
                      },
                      4: {
                        legenda : "Gastos",
                        icon: AttachMoneyOutlinedIcon
                      },
                      5: {
                        legenda : "Pacientes",
                        icon: GroupOutlinedIcon
                      },
                      6: {
                        legenda : "Agendar",
                        icon: CalendarMonthOutlinedIcon
                      },
                    })
};
