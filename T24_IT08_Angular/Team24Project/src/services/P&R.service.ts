import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policy } from '../features/admin/components/admin-dashboard/policies-and-regulations/policy.model';

@Injectable({
  providedIn: 'root',
})
export class PandRService {
  private apiUrl = 'https://localhost:7102/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(
      `${this.apiUrl}/PoliciesAndRegulations/GetAllPoliciesAndRegulations`
    );
  }

  getPolicyById(policy_ID: number): Observable<Policy> {
    return this.http.get<Policy>(
      `${this.apiUrl}/PoliciesAndRegulations/GetPolicyAndRegulationById/${policy_ID}`
    );
  }

  approvePolicy(policy_ID: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/PoliciesAndRegulations/ApprovePolicy/${policy_ID}`,
      null,
      this.httpOptions
    );
  }

  updatePolicy(policy: Policy): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/PoliciesAndRegulations/UpdatePolicyAndRegulation/${policy.policy_ID}`,
      policy
    );
  }

  addPolicy(policy: Policy): Observable<Policy> {
    return this.http.post<Policy>(
      `${this.apiUrl}/PoliciesAndRegulations/AddPolicyAndRegulation`,
      policy,
      this.httpOptions
    );
  }
  deletePolicy(policy_ID: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/PoliciesAndRegulations/DeletePolicyAndRegulation/${policy_ID}`
    );
  }
}
