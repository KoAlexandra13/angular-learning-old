import { Component } from "@angular/core";
import { HeaderSearchService } from "./header.service";
import { AuthService } from "../../../auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false,
})
export class HeaderComponent {
    constructor(
        private searchService: HeaderSearchService,
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
