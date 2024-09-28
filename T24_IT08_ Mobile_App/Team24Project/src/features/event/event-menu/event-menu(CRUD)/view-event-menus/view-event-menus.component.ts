import { Component, OnInit } from '@angular/core';
import { EventMenuService, EventMenu } from '../../../../../services/event-menu.service';
import { saveAs } from 'file-saver';
import * as docx from 'docx';
import * as mammoth from 'mammoth';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-view-event-menus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-event-menus.component.html',
  styleUrl: './view-event-menus.component.scss'
})
export class ViewEventMenusComponent implements OnInit{
  eventMenus: EventMenu[] = [];
  //importedData: any;

  constructor(private eventMenuService: EventMenuService, private router:Router) {}

  ngOnInit(): void {
    this.loadEventMenus();
  }

  loadEventMenus(): void {
    this.eventMenuService.getEventMenus().subscribe((menus: EventMenu[]) => {
      this.eventMenus = menus;
    });
  }

  onImportedMenus(importedMenus: EventMenu[]): void {
    this.eventMenus = this.mergeEventMenus(this.eventMenus, importedMenus);
    this.saveChanges();  // Save merged results to the backend
  }


  //  // Function to check if a partial menu is a full EventMenu
  //  private isValidEventMenu(menu: Partial<EventMenu>): menu is EventMenu {
  //   return menu.name !== undefined && menu.description !== undefined &&
  //          menu.price !== undefined && menu.dateCreated !== undefined &&
  //          menu.dateModified !== undefined;
  // }

  async downloadDocument(): Promise<void> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const email = currentUser.Email || 'Unknown User';
    const currentDate = new Date().toLocaleString();
    const logoUrl = 'assets/sfg_logo.png';
    const logoBase64 = await this.getBase64ImageFromUrl(logoUrl);

    const doc = new docx.Document({
      sections: [
        {
          children: [
            new docx.Paragraph({
              children: [
                new docx.ImageRun({
                  data: logoBase64,
                  transformation: {
                    width: 100,
                    height: 50,
                  },
                }),
              ],
              spacing: { after: 400 },
            }),
            new docx.Paragraph({
              text: `Downloaded by: ${email} on ${currentDate}`,
              heading: docx.HeadingLevel.HEADING_2,
              spacing: { after: 400 },
            }),
            new docx.Paragraph({
              text: "Event Menus",
              heading: docx.HeadingLevel.HEADING_1,
              spacing: { after: 400 },
            }),
            this.createMenuTable(this.eventMenus),
          ],
        },
      ],
    });

    const blob = await docx.Packer.toBlob(doc);
    saveAs(blob, 'EventMenus.docx');
  }

  async getBase64ImageFromUrl(imageUrl: string): Promise<string> {
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }


// Helper function to create a table for event menus
createMenuTable(eventMenus: EventMenu[]): docx.Table {
  const tableRows = eventMenus.map(menu => {
    return new docx.TableRow({
      children: [
        new docx.TableCell({
          children: [new docx.Paragraph(menu.name)],
        }),
        new docx.TableCell({
          children: [new docx.Paragraph(menu.description)],
        }),
        new docx.TableCell({
          children: [new docx.Paragraph(menu.price.toString())],
        }),
        new docx.TableCell({
          children: [new docx.Paragraph(menu.dateCreated)],
        }),
        new docx.TableCell({
          children: [new docx.Paragraph(menu.dateModified)],
        }),
      ],
    });
  });

  return new docx.Table({
    rows: [
      new docx.TableRow({
        children: [
          new docx.TableCell({
            children: [new docx.Paragraph("Menu Name")],
            shading: { fill: "cccccc" },
          }),
          new docx.TableCell({
            children: [new docx.Paragraph("Description")],
            shading: { fill: "cccccc" },
          }),
          new docx.TableCell({
            children: [new docx.Paragraph("Price")],
            shading: { fill: "cccccc" },
          }),
          new docx.TableCell({
            children: [new docx.Paragraph("Date Created")],
            shading: { fill: "cccccc" },
          }),
          new docx.TableCell({
            children: [new docx.Paragraph("Date Modified")],
            shading: { fill: "cccccc" },
          }),
        ],
      }),
      ...tableRows,
    ],
    width: { size: 100, type: docx.WidthType.PERCENTAGE },
  });
}

importDocument(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const arrayBuffer = e.target.result;
      this.processDocument(arrayBuffer);
    };
    reader.readAsArrayBuffer(file);
  }
}

processDocument(arrayBuffer: ArrayBuffer): void {
  mammoth.convertToHtml({ arrayBuffer }).then((result) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(result.value, "text/html");
    this.clearAndSetNewMenus(doc);
  });
}

clearAndSetNewMenus(doc: Document): void {
  const rows = doc.querySelectorAll("table tr");
  let newMenus: EventMenu[] = [];
  rows.forEach((row, index) => {
    if (index === 0) return; // skip header row
    const cells = row.querySelectorAll("td");
    newMenus.push({
      name: cells[0]?.textContent || "",
      description: cells[1]?.textContent || "",
      price: parseFloat(cells[2]?.textContent || "0"),
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      isActive: true,
      isDeleted: false,
      eventMenuID: index,  // Assuming sequential IDs for simplicity
      eventTypeId:1
    });
  });

  this.eventMenus = newMenus;  // Replace existing menus with new ones
  this.saveChanges();  // Optionally save to backend
}


// Adjust the parseAndUpdateTable function to handle structured data more effectively
parseAndUpdateTable(doc: Document): void {
  const rows = doc.querySelectorAll("table tr");
  rows.forEach((row, index) => {
    if (index === 0) return; // skip header row
    const cells = row.querySelectorAll("td");
    const menu: Partial<EventMenu> = {
      name: cells[0]?.textContent || "",
      description: cells[1]?.textContent || "",
      price: parseFloat(cells[2]?.textContent || "0"),
      dateCreated: cells[3]?.textContent || new Date().toISOString(),
      dateModified: cells[4]?.textContent || new Date().toISOString(),
    };
    if (this.isValidEventMenu(menu as EventMenu)) {
      this.eventMenus.push(menu as EventMenu);
    }
  });
  this.updateEventMenus();
}

isValidEventMenu(menu: Partial<EventMenu>): menu is EventMenu {
  return menu.name !== undefined && menu.description !== undefined &&
         menu.price !== undefined && menu.dateCreated !== undefined &&
         menu.dateModified !== undefined;
}


// Function to refresh the UI and save changes to the database
updateEventMenus(): void {
  this.eventMenus = [...this.eventMenus];
  this.saveChanges();
}

resetMenu(): Partial<EventMenu> {
  return {
    name: '',
    description: '',
    price: 0,
    dateCreated: '',
    dateModified: '',
    eventMenuID: 0,
    eventTypeId: 0,
    isActive: false,
    isDeleted: false
  };
}



// function isValidEventMenu(menu: Partial<EventMenu>): menu is EventMenu {
//   return menu.name !== undefined && menu.description !== undefined && 
//          menu.price !== undefined && menu.dateCreated !== undefined && 
//          menu.dateModified !== undefined;
// }
  goBack() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const role = currentUser.role;
    const emailaddress = currentUser.emailaddress;
  
    if (role === 'Admin') {
      this.router.navigate([`/admin-dashboard/${emailaddress}`]);
    } else if (role === 'Staff') {
      this.router.navigate([`/staff-dashboard/${emailaddress}`]);
    } else if (role === 'Guest') {
      this.router.navigate([`/guest-dashboard/${emailaddress}`]);
    } else {
      console.error('Unknown role:', role);
      this.router.navigate(['/']); // Default route or error page
    }
  }
  

  mergeEventMenus(existingMenus: EventMenu[], importedMenus: EventMenu[]): EventMenu[] {
    const mergedMenus: EventMenu[] = [];

    existingMenus.forEach(existingMenu => {
      const matchingImportedMenu = importedMenus.find(menu => menu.name === existingMenu.name);
      if (matchingImportedMenu) {
        mergedMenus.push({
          ...existingMenu,
          description: matchingImportedMenu.description,
          price: matchingImportedMenu.price,
          dateModified: new Date().toISOString(),
          isActive: true,
          isDeleted: false
        });
      } else {
        mergedMenus.push(existingMenu);
      }
    });

    importedMenus.forEach(importedMenu => {
      const exists = existingMenus.some(menu => menu.name === importedMenu.name);
      if (!exists) {
        mergedMenus.push({
          ...importedMenu,
          dateCreated: new Date().toISOString(),
          dateModified: new Date().toISOString(),
          isActive: true,
          isDeleted: false
        });
      }
    });

    return mergedMenus;
  }
  

 // Revised saveChanges to handle both creating new menus and updating existing ones
 saveChanges(): void {
  this.eventMenus.forEach(menu => {
    if (menu.eventMenuID && menu.eventMenuID > 0) {
      // Update existing menu
      this.eventMenuService.updateEventMenu(menu.eventMenuID, menu).subscribe({
        next: () => console.log(`Updated: ${menu.name}`),
        error: (error) => console.error(`Error updating ${menu.name}: `, error)
      });
    } else {
      // Create new menu
      this.eventMenuService.createEventMenu(menu).subscribe({
        next: () => console.log(`Created: ${menu.name}`),
        error: (error) => console.error(`Error creating ${menu.name}: `, error)
      });
    }
  });
}
  
  //   // Handle deleted menus
  //   const removedMenus = this.eventMenus.filter(menu => menu.isDeleted === true);
  //   removedMenus.forEach((menu) => {
  //     this.eventMenuService.deleteEventMenu(menu.eventMenuID).subscribe({
  //       next: (response) => {
  //         console.log(`Deleted event menu: ${menu.name}`);
  //       },
  //       error: (error) => {
  //         console.error(`Failed to delete menu: ${menu.name}`, error);
  //       }
  //     });
  //   });
  // } 
}
