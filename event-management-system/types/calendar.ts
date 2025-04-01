export interface Event {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  location?: string;
  color?: string;
  allDay: boolean;
  type: 'conference' | 'meeting' | 'event' | 'workshop' | 'holiday' | 'other';
}

export interface PermissionRequest {
  id: string;
  eventId: string;
  eventTitle: string;
  requestedBy: string;
  requestedDate: Date;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'pending' | 'approved' | 'denied';
  reviewedBy?: string;
  reviewedDate?: Date;
  comments?: string;
} 