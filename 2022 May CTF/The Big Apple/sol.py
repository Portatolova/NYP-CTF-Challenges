from base64 import b64decode

flag = [x for x in "VGytUWU{Tn9jM1Z{WlY4fFhzY3qlRklxYUROZnJrTkNYMkFpWTE5fnRIVnuiVEJnYUROd2NGOXRNMTmsTTJNfFqETnZNV1JzZmE9PQ=="]

for i in range(len(flag)):
    if ord(flag[i]) < 124 and ord(flag[i]) > 97:
        flag[i] = chr(ord(flag[i]) - 1)

print(b64decode(b64decode("".join(flag))).decode("utf-8"))