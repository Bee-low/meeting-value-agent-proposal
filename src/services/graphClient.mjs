export class GraphMeetingClient {
  constructor(config) {
    this.config = config;
  }

  async getMeetingArtifacts() {
    throw new Error('Graph integration is not configured yet. Add tenant app registration, Graph permissions, and token acquisition before calling this method.');
  }

  async getAttendanceReport() {
    throw new Error('Attendance report retrieval requires Microsoft Graph OnlineMeetingArtifact permissions and tenant admin consent.');
  }

  async getTranscript() {
    throw new Error('Transcript retrieval depends on meeting policy, recording/transcription settings, and approved Graph permissions.');
  }
}
