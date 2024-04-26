import type { Photo } from "~/app/core/shared/model/photo";
import Service from "~/app/core/shared/service/service";

class PhotoService extends Service {
	getPhotos() {
		return this.http.get<Photo[]>("/photos");
	}

	getPhoto(photoId: number) {
		return this.http.get<Photo>(`/photo/${photoId}`);
	}

	getComments(photoId: number) {
		return this.http.get<Comment[]>(`/photo/${photoId}/comments`);
	}

	getComment({ photoId, commentId }: { photoId: number; commentId: number }) {
		return this.http.get<Comment[]>(`/photo/${photoId}/comments/${commentId}`);
	}
}

export default new PhotoService();
