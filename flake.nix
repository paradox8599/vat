{
  description = "vat";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      nixpkgs,
      flake-utils,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        name = "vat";
        version = "0.1.0";
        pkgs = import nixpkgs { inherit system; };

      in
      {
        devShells.default = pkgs.mkShell {
          inherit name;
          buildInputs = [
            pkgs.pnpm
            pkgs.nodejs_22
          ];

          shellHook = '''';
        };

        packages.default = pkgs.buildNpmPackage {
          pname = name;
          inherit version;
          src = ./.;
          npmDepsHash = pkgs.lib.fakeSha256;

          buildInputs = [
            pkgs.nodejs
          ];

          nativeBuildInputs = [
            pkgs.pnpm
          ];

          installPhase = '''';
        };
      }
    );
}
