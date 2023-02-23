import Api from "./api";

const API_ENDPOINT = "https://api-prod.usermanual.com/v2";

interface IProductParams {
  id: string;
}

interface IAssetParams {
  id: string;
}

interface IPDFDocumentParams {
  id: string;
}

interface IPDFDocumentsParams {
  customField?: string;
  customFields?: string[];
  customField2?: string;
  customFields2?: string[];
  customField3?: string;
  customFields3?: string[];
}

interface IPDFUploadDocumentFileParams {
  uploadCompleted: boolean;
}

interface IProductDocument {
  id: string;
  type: "PDF" | "Doc";
}

interface IProductAsset {
  assetId: string;
  order: number;
}

interface IProductTranslation {
  name: string;
  slug: string;
  shortDescription?: string;
  localeId: string;
}

interface ICreateProductParams { 
  name: string;
  status: "Draft" | "Active";
  documents: IProductDocument[];
  assets: IProductAsset[];
  translations: IProductTranslation[];
}

interface ICreateAssetParams { 
  name: string;
  type: "MediaLibrary" | "OrganizationAvatar" | "UserAvatar";
  contentType: "image/png" | "image/jpeg";
}

interface IPDFDocumentTranslation {
  name: string;
  slug: string;
  localeId: string;
}

interface IPDFDocumentMeta {
  customField?: string;
  customField2?: string;
  customField3?: string;
}

interface ICreatePDFDocumentParams {
  name: string;
  fileName: string;
  type: "Manual" | "Specifications" | "Wiring" | "Other";
  metadata?: IPDFDocumentMeta;
  translations: IPDFDocumentTranslation[];
  manualActiveOnProcessed?: boolean;
}

export interface IAuthResponse {
  id: number;
  displayName: string;
  slug: string;
  message: string;
}

export interface IProductTranslationResponse {
  id: string;
  name: string;
  shortDescription?: string;
  slug: string;
  localeId: string;
}

export interface IProductAssetResponse {
  id: string;
  type: "MediaLibrary" | "OrganizationAvatar" | "UserAvatar";
  contentType: "image/png" | "image/jpeg";
  fileName: string;
  order: number;
}

export interface IProductDocumentResponse {
  id: string; 
  variant: "Doc" | "PDF";
  slug?: string;
  type?: string;
  status: "Active" | "Draft";
  order: number;
}

export interface IProductResponse {
  id: string;
  name: string;
  status: "Active" | "Draft";
  barcodes: string[];
  modelNumber?: string;
  translations: IProductTranslationResponse[];
  assets: IProductAssetResponse[];
  documents: IProductDocumentResponse[];
}

export interface IAssetResponse {
  id: string;
  fileName: string;
  type: "MediaLibrary" | "OrganizationAvatar" | "UserAvatar";
  contentType: "image/png" | "image/jpeg";
  createdAt: string;
  completedAt: string;
}

export interface IPDFDocumentTranslationResponse {
  id: string;
  name: string;
  slug: string;
  typeOther?: string;
  localeId: string;
}

export interface IPDFDocumentFileResponse {
  id: string;
  createdAt: string;
  processedAt?: string;
}

export interface IPDFDocumentResponse {
  id: string;
  name: string;
  status: "Draft" | "Active";
  type: string;
  activeLocales: string[];
  activeFile: IPDFDocumentFileResponse;
  translations: IPDFDocumentTranslationResponse[];
}

export interface IPDFDocumentWithSignatureResponse {
  PDFDocument: IPDFDocumentResponse;
  signedUploadUrl: string;
}

interface IUploadAssetParams { 
  uploadCompleted: boolean;
}

export interface IUsermanualOptions {
  apiKey: string;
  baseUrl?: string;
}

export class UserManual {
  private api;

  constructor(options: IUsermanualOptions) {
    this.api = new Api(options, options.baseUrl ? options.baseUrl : API_ENDPOINT);
  }

  public async auth(): Promise<IAuthResponse> {
    return this.api.get<
    IAuthResponse
    >('/auth');
  }

  /* Products */
  public async createProduct(params: ICreateProductParams): Promise<IProductResponse> {
    return this.api.post<
      IProductResponse, 
      ICreateProductParams
    >('/products', params);
  }

  public async getProduct(id: string): Promise<IProductResponse> {
    return this.api.get<
      IProductResponse, 
      IProductParams
    >(`/products/${id}`, {
      id
    });
  }

  /* Assets */
  public async createAsset(params: ICreateAssetParams): Promise<IAssetResponse> {
    return this.api.post<
      IAssetResponse, 
      ICreateAssetParams
    >('/assets', params);
  }

  public async getAsset(id: string): Promise<IAssetResponse> {
    return this.api.get<
      IAssetResponse, 
      IAssetParams
    >(`/assets/${id}`, {
      id
    });
  }

  public async uploadAssetComplete(id: string): Promise<IAssetResponse> {
    return this.api.patch<
      IAssetResponse, 
      IUploadAssetParams
    >(`/assets/${id}`, {
      id,
      uploadCompleted: true
    });
  }

  /* PDF Documents */
  public async createPDFDocument(params: ICreatePDFDocumentParams): Promise<IPDFDocumentWithSignatureResponse> {
    return this.api.post<
      IPDFDocumentWithSignatureResponse, 
      ICreatePDFDocumentParams
    >('/pdf-documents', params);
  }

  public async getPDFDocuments(params?: IPDFDocumentsParams): Promise<IPDFDocumentResponse> {
    return this.api.get<
      IPDFDocumentResponse, 
      IPDFDocumentsParams
    >(`/pdf-documents`, params);
  }

  public async getPDFDocument(id: string): Promise<IPDFDocumentResponse> {
    return this.api.get<
      IPDFDocumentResponse, 
      IPDFDocumentParams
    >(`/pdf-documents/${id}`, {
      id
    });
  }

  public async uploadPDFDocumentFileComplete(id: string, fileId: string): Promise<IPDFDocumentFileResponse> {
    return this.api.patch<
      IPDFDocumentFileResponse, 
      IPDFUploadDocumentFileParams
    >(`/pdf-documents/${id}/files/${fileId}`, {
      id,
      fileId,
      uploadCompleted: true
    });
  }
}