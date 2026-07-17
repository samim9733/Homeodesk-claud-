import { Patient, Reminder, PharmacyRemedy, Supplier, Invoice, PharmacyStats } from './types';

export const DEMO_PATIENTS: Patient[] = [];

export const DEMO_REMINDERS: Reminder[] = [];

export const PHARMACY_DEMO_DATA: {
  remedies: PharmacyRemedy[];
  suppliers: Supplier[];
  invoices: Invoice[];
  stats: PharmacyStats;
} = {
  remedies: [],
  suppliers: [],
  invoices: [],
  stats: {
    totalRemedies: 0,
    monthlyGrowth: 0,
    activeStockValue: 0,
    criticalShortages: [],
    stockByKingdom: [
      { kingdom: 'Plant', percentage: 0, color: '#10b981' },
      { kingdom: 'Mineral', percentage: 0, color: '#3b82f6' },
      { kingdom: 'Animal', percentage: 0, color: '#f59e0b' },
    ]
  }
};
