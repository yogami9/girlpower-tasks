#!/usr/bin/env python3
"""
File Contents Collector
This script reads all files in the current directory and subdirectories,
then saves their contents to a single text file with file path information.
Excludes node_modules, common dependency directories, and non-essential config files.
"""

import os
import sys
from pathlib import Path
from datetime import datetime

# Directories to exclude from scanning
EXCLUDED_DIRS = {
    'node_modules',
    '__pycache__',
    '.git',
    '.venv',
    'venv',
    'env',
    '.idea',
    '.vscode',
    'dist',
    'build',
    '.next',
    '.nuxt',
    'vendor',
    'target'
}

# Specific files to exclude (non-essential configuration and generated files)
EXCLUDED_FILES = {
    # Auto-generated files
    'next-env.d.ts',
    
    # Configuration files (can be regenerated)
    'eslint.config.mjs',
    'postcss.config.mjs',
    'tsconfig.json',
    'next.config.ts',
    
    # Lock files (too large, not needed for code review)
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    
    # Utility scripts
    'collect_files.py',
    
    # Output file
    'collected_files_content.txt'
}

def is_text_file(file_path):
    """
    Check if a file is likely a text file by examining its extension
    and attempting to read a small portion as text.
    """
    # Common text file extensions
    text_extensions = {
        '.txt', '.py', '.js', '.html', '.css', '.json', '.xml', '.yml', '.yaml',
        '.md', '.rst', '.csv', '.sql', '.sh', '.bat', '.ps1', '.php', '.java',
        '.c', '.cpp', '.h', '.hpp', '.cs', '.rb', '.go', '.rs', '.swift',
        '.kt', '.scala', '.pl', '.r', '.m', '.lua', '.vim', '.ini', '.cfg',
        '.conf', '.log', '.dockerfile', '.gitignore', '.gitattributes', '.ts',
        '.tsx', '.jsx', '.vue', '.svelte', '.mjs', '.cjs'
    }
    
    file_path = Path(file_path)
    
    # Check extension first
    if file_path.suffix.lower() in text_extensions:
        return True
    
    # If no extension or unknown extension, try to read a small portion
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            f.read(1024)  # Try to read first 1KB as text
        return True
    except (UnicodeDecodeError, PermissionError):
        return False

def should_exclude_path(path, base_path):
    """
    Check if a path should be excluded based on EXCLUDED_DIRS.
    Returns True if any part of the path matches an excluded directory.
    """
    try:
        relative_path = path.relative_to(base_path)
        path_parts = relative_path.parts
        
        # Check if any part of the path is in the excluded directories
        for part in path_parts:
            if part in EXCLUDED_DIRS:
                return True
        return False
    except ValueError:
        return False

def should_exclude_file(file_path):
    """
    Check if a specific file should be excluded based on EXCLUDED_FILES.
    """
    return file_path.name in EXCLUDED_FILES

def collect_files(directory_path):
    """
    Recursively collect all files from the directory and subdirectories,
    excluding specified directories and files.
    Returns a list of file paths.
    """
    files = []
    directory = Path(directory_path)
    
    try:
        for item in directory.rglob('*'):
            if item.is_file():
                # Skip if in excluded directory or is an excluded file
                if not should_exclude_path(item, directory) and not should_exclude_file(item):
                    files.append(item)
    except PermissionError as e:
        print(f"Permission denied accessing: {e}")
    
    return sorted(files)

def read_file_content(file_path):
    """
    Read the content of a file, handling various encodings and errors.
    """
    encodings = ['utf-8', 'latin-1', 'cp1252', 'ascii']
    
    for encoding in encodings:
        try:
            with open(file_path, 'r', encoding=encoding) as f:
                return f.read()
        except (UnicodeDecodeError, UnicodeError):
            continue
        except PermissionError:
            return "[Permission Denied - Cannot read file]"
        except Exception as e:
            return f"[Error reading file: {str(e)}]"
    
    return "[Binary file or unsupported encoding]"

def format_file_size(size_bytes):
    """
    Format file size in human-readable format.
    """
    for unit in ['bytes', 'KB', 'MB', 'GB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.2f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.2f} TB"

def main():
    """
    Main function to collect and save file contents.
    """
    current_dir = Path.cwd()
    output_file = current_dir / "collected_files_content.txt"
    
    print("=" * 80)
    print("FILE CONTENTS COLLECTOR")
    print("=" * 80)
    print(f"\nCollecting files from: {current_dir}")
    print(f"\nExcluding directories: {', '.join(sorted(EXCLUDED_DIRS))}")
    print(f"\nExcluding files: {', '.join(sorted(EXCLUDED_FILES))}")
    print(f"\nOutput will be saved to: {output_file}\n")
    print("=" * 80)
    
    # Collect all files
    all_files = collect_files(current_dir)
    
    print(f"\nFound {len(all_files)} files to process...\n")
    
    # Create the output file
    try:
        with open(output_file, 'w', encoding='utf-8') as out_file:
            # Write header
            out_file.write("=" * 80 + "\n")
            out_file.write("FILE CONTENTS COLLECTION\n")
            out_file.write("=" * 80 + "\n")
            out_file.write(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            out_file.write(f"Source directory: {current_dir}\n")
            out_file.write(f"Total files processed: {len(all_files)}\n")
            out_file.write("\n" + "-" * 80 + "\n")
            out_file.write("EXCLUDED DIRECTORIES:\n")
            out_file.write(", ".join(sorted(EXCLUDED_DIRS)) + "\n")
            out_file.write("\n" + "-" * 80 + "\n")
            out_file.write("EXCLUDED FILES:\n")
            out_file.write(", ".join(sorted(EXCLUDED_FILES)) + "\n")
            out_file.write("=" * 80 + "\n\n")
            
            processed_count = 0
            skipped_count = 0
            total_size = 0
            
            for file_path in all_files:
                relative_path = file_path.relative_to(current_dir)
                file_size = file_path.stat().st_size
                
                # Check if it's likely a text file
                if is_text_file(file_path):
                    print(f"✓ Processing: {relative_path}")
                    
                    # Write file header
                    out_file.write("\n" + "=" * 80 + "\n")
                    out_file.write(f"FILE: {relative_path}\n")
                    out_file.write(f"PATH: {file_path}\n")
                    out_file.write(f"SIZE: {format_file_size(file_size)}\n")
                    out_file.write("=" * 80 + "\n\n")
                    
                    # Read and write file content
                    content = read_file_content(file_path)
                    out_file.write(content)
                    out_file.write("\n\n")
                    
                    processed_count += 1
                    total_size += file_size
                else:
                    print(f"⊗ Skipping binary file: {relative_path}")
                    skipped_count += 1
            
            # Write summary
            out_file.write("\n" + "=" * 80 + "\n")
            out_file.write("COLLECTION SUMMARY\n")
            out_file.write("=" * 80 + "\n")
            out_file.write(f"Files processed: {processed_count}\n")
            out_file.write(f"Files skipped (binary): {skipped_count}\n")
            out_file.write(f"Total files found: {len(all_files)}\n")
            out_file.write(f"Total content size: {format_file_size(total_size)}\n")
            out_file.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            out_file.write("=" * 80 + "\n")
    
    except Exception as e:
        print(f"\n✗ Error creating output file: {e}")
        sys.exit(1)
    
    print("\n" + "=" * 80)
    print("COLLECTION COMPLETE")
    print("=" * 80)
    print(f"\n✓ Processed: {processed_count} files")
    print(f"⊗ Skipped: {skipped_count} binary files")
    print(f"📁 Total size: {format_file_size(total_size)}")
    print(f"💾 Output saved to: {output_file}\n")
    print("=" * 80)

if __name__ == "__main__":
    main()