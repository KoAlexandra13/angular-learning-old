import { Component } from "@angular/core";
import { SearchService } from "../../../core/services/search.service";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    imports: [CommonModule],
    standalone: true,
})
export class HeaderComponent {
    constructor(
        private searchService: SearchService,
        private authService: AuthService,
        private router: Router,
    ) {}

    onSearch(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        this.searchService.updateSearchQuery(inputElement.value);
    }

    onLogout(): void {
        this.authService.logout();
        this.router.navigate(['/auth']);
    }

    isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }
};
